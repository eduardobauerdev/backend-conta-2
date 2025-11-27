"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import { KanbanColumn } from "@/components/crm/kanban-column"
import { LeadCard } from "@/components/crm/lead-card"
import { NewLeadDialog } from "@/components/crm/new-lead-dialog"
import { EditLeadDialog } from "@/components/crm/edit-lead-dialog"
import { ViewLeadDialog } from "@/components/crm/view-lead-dialog"
import { MoveLeadDialog } from "@/components/crm/move-lead-dialog"
import { DeleteLeadDialog } from "@/components/crm/delete-lead-dialog"
import { FilterPanel, type FilterRule } from "@/components/crm/filter-panel"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import type { Lead } from "@/types/crm"
import { useRealtimeTable } from "@/contexts/realtime-context"

function formatDate(date: Date, formatStr: string): string {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const monthShort = months[date.getMonth()]

  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  const weekDay = weekDays[date.getDay()]

  if (formatStr === "dd-MM-yyyy") {
    return `${day}-${month}-${year}`
  }
  if (formatStr === "yyyy-MM-dd") {
    return `${year}-${month}-${day}`
  }
  if (formatStr === "dd MMM") {
    return `${day} ${monthShort}`
  }
  if (formatStr === "dd MMM yyyy") {
    return `${day} ${monthShort} ${year}`
  }
  if (formatStr === "dd/MM/yyyy (EEEE)") {
    return `${day}/${month}/${year} (${weekDay})`
  }
  return date.toISOString()
}

function parseDateFromDB(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00")
}

function parseDateStr(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-")
  return new Date(`${year}-${month}-${day}`)
}

function startOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7)
}

function subWeeks(date: Date, weeks: number): Date {
  return addDays(date, -weeks * 7)
}

export default function CRMPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => startOfWeek(new Date()))
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeFilters, setActiveFilters] = useState<FilterRule[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [viewingLead, setViewingLead] = useState<Lead | null>(null)
  const [movingLead, setMovingLead] = useState<Lead | null>(null)
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const kanbanContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { user } = useUser()

  const supabase = createClient()

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const fetchLeads = async () => {
    const weekEnd = addDays(currentWeekStart, 6)

    const weekStartStr = formatDate(currentWeekStart, "yyyy-MM-dd")
    const weekEndStr = formatDate(weekEnd, "yyyy-MM-dd")

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .gte("proximo_contato", weekStartStr)
      .lte("proximo_contato", weekEndStr)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching leads:", error)
      toast.error("Erro ao carregar leads")
      return
    }

    setLeads(data || [])
  }

  useEffect(() => {
    fetchLeads()
  }, [currentWeekStart])

  useEffect(() => {
    if (!activeId || !kanbanContainerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [activeId])

  useEffect(() => {
    if (!activeId) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
      return
    }

    const WEEK_CHANGE_THRESHOLD = 100

    autoScrollIntervalRef.current = setInterval(() => {
      const windowWidth = window.innerWidth

      if (mousePosition.x < WEEK_CHANGE_THRESHOLD) {
        setCurrentWeekStart((prev) => subWeeks(prev, 1))
        toast.info("Semana anterior")
      } else if (mousePosition.x > windowWidth - WEEK_CHANGE_THRESHOLD) {
        setCurrentWeekStart((prev) => addWeeks(prev, 1))
        toast.info("Próxima semana")
      }
    }, 800)

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [activeId, mousePosition])

  useRealtimeTable(
    "leads",
    (newLead: any) => {
      const weekEnd = addDays(currentWeekStart, 6)
      const leadDate = newLead.proximo_contato
      const weekStart = formatDate(currentWeekStart, "yyyy-MM-dd")
      const weekEndStr = formatDate(weekEnd, "yyyy-MM-dd")

      if (leadDate >= weekStart && leadDate <= weekEndStr) {
        setLeads((prev) => {
          if (prev.some((l) => l.id === newLead.id)) return prev
          return [newLead, ...prev]
        })
        toast.info(`Novo lead adicionado: ${newLead.nome}`)
      }
    },
    (updatedLead: any) => {
      setLeads((prev) => {
        const exists = prev.some((l) => l.id === updatedLead.id)
        const weekEnd = addDays(currentWeekStart, 6)
        const leadDate = updatedLead.proximo_contato
        const weekStart = formatDate(currentWeekStart, "yyyy-MM-dd")
        const weekEndStr = formatDate(weekEnd, "yyyy-MM-dd")
        const shouldBeInWeek = leadDate >= weekStart && leadDate <= weekEndStr

        if (shouldBeInWeek) {
          if (exists) {
            return prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
          } else {
            return [updatedLead, ...prev]
          }
        } else {
          return prev.filter((l) => l.id !== updatedLead.id)
        }
      })
    },
    (deletedLead: any) => {
      setLeads((prev) => prev.filter((l) => l.id !== deletedLead.id))
      toast.info(`Lead removido`)
    },
  )

  const filteredLeads = useMemo(() => {
    if (activeFilters.length === 0) return leads

    return leads.filter((lead) => {
      return activeFilters.every((filter) => {
        if (filter.type === "vendedor") {
          return lead.adicionado_por_nome === filter.value
        }
        if (filter.type === "temperatura") {
          return lead.temperatura === filter.value
        }
        if (filter.type === "acao") {
          return lead.acao === filter.value
        }
        return true
      })
    })
  }, [leads, activeFilters])

  const uniqueVendedores = useMemo(() => {
    return Array.from(new Set(leads.map((l) => l.adicionado_por_nome))).sort()
  }, [leads])

  const uniqueAcoes = useMemo(() => {
    return Array.from(new Set(leads.map((l) => l.acao).filter(Boolean) as string[])).sort()
  }, [leads])

  const leadsByDay = useMemo(() => {
    const grouped: Record<string, Lead[]> = {}

    weekDays.forEach((day) => {
      const dateStr = formatDate(day, "yyyy-MM-dd")
      grouped[dateStr] = filteredLeads.filter((lead) => {
        return lead.proximo_contato === dateStr
      })
    })

    return grouped
  }, [filteredLeads, currentWeekStart])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }

    if (!over || !user) {
      setActiveId(null)
      return
    }

    const leadId = active.id as string
    const newDate = over.id as string
    const lead = leads.find((l) => l.id === leadId)

    if (!lead) {
      setActiveId(null)
      return
    }

    const currentDate = lead.proximo_contato

    if (currentDate === newDate) {
      setActiveId(null)
      return
    }

    const dataAntigaFormatada = formatDate(parseDateFromDB(lead.proximo_contato), "dd/MM/yyyy (EEEE)")
    const dataNovaFormatada = formatDate(parseDateFromDB(newDate), "dd/MM/yyyy (EEEE)")

    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, proximo_contato: newDate } : l)))

    const { error: updateError } = await supabase.from("leads").update({ proximo_contato: newDate }).eq("id", leadId)

    if (updateError) {
      console.error("Error updating lead:", updateError)
      toast.error("Erro ao mover lead")
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, proximo_contato: lead.proximo_contato } : l)))
      setActiveId(null)
      return
    }

    await supabase.from("lead_logs").insert({
      lead_id: leadId,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "movido",
      de_data: lead.proximo_contato,
      para_data: newDate,
      detalhes: `Lead movido de ${dataAntigaFormatada} para ${dataNovaFormatada}`,
    })

    toast.success("Lead movido com sucesso")
    setActiveId(null)
  }

  const handleLeadClick = (lead: Lead) => {
    if (!user) return

    const canEdit =
      user.cargo === "Administrador" || user.cargo === "Desenvolvedor" || lead.adicionado_por_id === user.id

    if (!canEdit) {
      toast.error("Você não tem permissão para editar este lead")
      return
    }

    setEditingLead(lead)
  }

  const handleConvertLead = async (lead: Lead) => {
    if (!user) return

    const canEdit =
      user.cargo === "Administrador" || user.cargo === "Desenvolvedor" || lead.adicionado_por_id === user.id

    if (!canEdit) {
      toast.error("Você não tem permissão para converter este lead")
      return
    }

    const { error } = await supabase.from("leads").update({ status: "convertido" }).eq("id", lead.id)

    if (error) {
      console.error("Error converting lead:", error)
      toast.error("Erro ao converter lead")
      return
    }

    await supabase.from("lead_logs").insert({
      lead_id: lead.id,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "convertido",
      detalhes: `Lead "${lead.nome}" marcado como convertido`,
    })

    toast.success("Lead convertido com sucesso!")
    fetchLeads()
  }

  const handleUnconvertLead = async (lead: Lead) => {
    if (!user) return

    const canEdit =
      user.cargo === "Administrador" || user.cargo === "Desenvolvedor" || lead.adicionado_por_id === user.id

    if (!canEdit) {
      toast.error("Você não tem permissão para desconverter este lead")
      return
    }

    const { error } = await supabase.from("leads").update({ status: "ativo" }).eq("id", lead.id)

    if (error) {
      console.error("Error unconverting lead:", error)
      toast.error("Erro ao desconverter lead")
      return
    }

    await supabase.from("lead_logs").insert({
      lead_id: lead.id,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "desconvertido",
      detalhes: `Lead "${lead.nome}" marcado como ativo novamente`,
    })

    toast.success("Lead desconvertido com sucesso!")
    fetchLeads()
  }

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null

  return (
    <div className="flex-1 p-8 bg-background min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM</h1>
          <p className="text-muted-foreground mt-1">Gerenciamento de leads semanais</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterPanel vendedores={uniqueVendedores} acoes={uniqueAcoes} onFiltersChange={setActiveFilters} />
          <Button onClick={() => setIsNewLeadOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between bg-card rounded-xl p-4 shadow-sm border">
        <Button
          variant="outline"
          onClick={() => setCurrentWeekStart((prev) => subWeeks(prev, 1))}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Semana Anterior
        </Button>
        <h2 className="text-lg font-semibold">
          {formatDate(currentWeekStart, "dd MMM")} - {formatDate(addDays(currentWeekStart, 6), "dd MMM yyyy")}
        </h2>
        <Button
          variant="outline"
          onClick={() => setCurrentWeekStart((prev) => addWeeks(prev, 1))}
          className="gap-2 bg-transparent"
        >
          Próxima Semana
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div ref={kanbanContainerRef} className="grid grid-cols-7 gap-4">
          {weekDays.map((day) => {
            const dateStr = formatDate(day, "yyyy-MM-dd")
            return (
              <KanbanColumn
                key={dateStr}
                date={day}
                dateStr={dateStr}
                leads={leadsByDay[dateStr] || []}
                onLeadClick={handleLeadClick}
                onLeadView={setViewingLead}
                onLeadMove={setMovingLead}
                onLeadDelete={setDeletingLead}
                onLeadConvert={handleConvertLead}
                onLeadUnconvert={handleUnconvertLead}
              />
            )
          })}
        </div>

        <DragOverlay>
          {activeLead ? (
            <div className="opacity-50">
              <LeadCard lead={activeLead} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <NewLeadDialog
        open={isNewLeadOpen}
        onOpenChange={setIsNewLeadOpen}
        onSuccess={fetchLeads}
        weekStart={currentWeekStart}
      />

      <EditLeadDialog
        open={!!editingLead}
        onOpenChange={(open) => !open && setEditingLead(null)}
        lead={editingLead}
        onSuccess={fetchLeads}
      />

      <ViewLeadDialog open={!!viewingLead} onOpenChange={(open) => !open && setViewingLead(null)} lead={viewingLead} />

      <MoveLeadDialog
        open={!!movingLead}
        onOpenChange={(open) => !open && setMovingLead(null)}
        lead={movingLead}
        onSuccess={fetchLeads}
      />

      <DeleteLeadDialog
        open={!!deletingLead}
        onOpenChange={(open) => !open && setDeletingLead(null)}
        lead={deletingLead}
        onSuccess={fetchLeads}
      />
    </div>
  )
}
