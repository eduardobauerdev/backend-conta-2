"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"
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
import { ConvertLeadDialog } from "@/components/crm/convert-lead-dialog"
import { UnconvertLeadDialog } from "@/components/crm/unconvert-lead-dialog"
import { FilterPanel, type FilterRule } from "@/components/crm/filter-panel"
import { ChatEtiquetasDialog } from "@/components/whatsapp/chat-etiquetas-dialog"
import { ChatNotesDialog } from "@/components/whatsapp/chat-notes-dialog"
import { EtiquetaSelectorDialog } from "@/components/whatsapp/etiqueta-selector-dialog"
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
  const searchParams = useSearchParams()
  const highlightLeadId = searchParams.get("leadId")
  const targetDate = searchParams.get("date")

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    // Se veio uma data por parâmetro, navega para a semana correspondente
    if (targetDate) {
      const date = new Date(targetDate + "T00:00:00")
      return startOfWeek(date)
    }
    return startOfWeek(new Date())
  })
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeFilters, setActiveFilters] = useState<FilterRule[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [viewingLead, setViewingLead] = useState<Lead | null>(null)
  const [movingLead, setMovingLead] = useState<Lead | null>(null)
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null)
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null)
  const [unconvertingLead, setUnconvertingLead] = useState<Lead | null>(null)
  const [highlightedLeadId, setHighlightedLeadId] = useState<string | null>(null)
  const [showEtiquetasDialog, setShowEtiquetasDialog] = useState(false)
  const [selectedLeadForEtiquetas, setSelectedLeadForEtiquetas] = useState<{ chatId: string; chatUuid: string; etiquetas: Array<{ id: string; nome: string; cor: string }> } | null>(null)
  const [showNotesDialog, setShowNotesDialog] = useState(false)
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<{ chatId: string; chatName: string; chatUuid: string } | null>(null)
  const [showEtiquetaSelectorDialog, setShowEtiquetaSelectorDialog] = useState(false)
  const [selectedLeadForAddEtiqueta, setSelectedLeadForAddEtiqueta] = useState<{ chatId: string; chatName: string; chatUuid: string; etiquetaIds: string[] } | null>(null)
  const [onlyMyLeads, setOnlyMyLeads] = useState(() => {
    // Carrega o estado do localStorage se disponível
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crm-only-my-leads')
      return saved === 'true'
    }
    return false
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [etiquetas, setEtiquetas] = useState<{ id: string; nome: string; cor: string }[]>([])
  const [availableUsers, setAvailableUsers] = useState<{ id: string; nome: string; cargo: string; cor: string }[]>([])
  const [chatEtiquetasMap, setChatEtiquetasMap] = useState<Record<string, string[]>>({}) // chat_uuid -> etiqueta_ids
  const [chatAssignmentsMap, setChatAssignmentsMap] = useState<Record<string, { assigned_to_name: string; assigned_to_cargo?: string; assigned_to_color?: string }>>({})
  const [chatNotesMap, setChatNotesMap] = useState<Record<string, boolean>>({})
  const [chatIdMap, setChatIdMap] = useState<Record<string, string>>({}) // chat_uuid -> chat_id
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

  // Persiste o estado "apenas meus leads" no localStorage
  useEffect(() => {
    localStorage.setItem('crm-only-my-leads', String(onlyMyLeads))
  }, [onlyMyLeads])

  // Efeito para destacar o lead quando vem por URL
  useEffect(() => {
    if (highlightLeadId) {
      // Aguarda os leads carregarem e então destaca
      const timer = setTimeout(() => {
        setHighlightedLeadId(highlightLeadId)
        
        // Scroll até o elemento
        const element = document.getElementById(`lead-card-${highlightLeadId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [highlightLeadId, leads])

  // Remove o destaque ao clicar em qualquer lugar
  useEffect(() => {
    if (!highlightedLeadId) return

    const handleClick = () => {
      setHighlightedLeadId(null)
      // Limpa os parâmetros da URL sem recarregar a página
      window.history.replaceState({}, '', '/crm')
    }

    // Aguarda um pouco antes de adicionar o listener para não remover imediatamente
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleClick)
    }
  }, [highlightedLeadId])

  // Carrega etiquetas disponíveis
  const fetchEtiquetas = async () => {
    try {
      const response = await fetch("/api/whatsapp/etiquetas")
      const data = await response.json()
      if (data.success) {
        setEtiquetas(data.etiquetas || [])
      }
    } catch (error) {
      console.error("Error fetching etiquetas:", error)
    }
  }

  // Carrega usuários disponíveis para atribuição
  const fetchAvailableUsers = async () => {
    try {
      // Busca perfis
      const { data: perfis } = await supabase.from("perfis").select("id, nome, cargo").order("nome")
      if (!perfis) return

      // Busca cores dos cargos
      const cargos = Array.from(new Set(perfis.map(p => p.cargo).filter(Boolean) as string[]))
      const { data: cargosData } = await supabase.from("cargos").select("nome, cor").in("nome", cargos)

      const coresMap: Record<string, string> = {}
      cargosData?.forEach(c => coresMap[c.nome] = c.cor)

      // Monta array com cor
      const usersWithColor = perfis.map(p => ({
        id: p.id,
        nome: p.nome || "",
        cargo: p.cargo || "",
        cor: p.cargo ? (coresMap[p.cargo] || "#6b7280") : "#6b7280"
      }))

      setAvailableUsers(usersWithColor)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  // Carrega mapeamento de chats -> etiquetas para os leads
  const fetchChatEtiquetasMap = async (chatUuids: string[]) => {
    if (chatUuids.length === 0) return

    try {
      const { data: chatsData } = await supabase
        .from("chats")
        .select("uuid, etiqueta_ids")
        .in("uuid", chatUuids)

      if (chatsData) {
        const map: Record<string, string[]> = {}
        chatsData.forEach((chat) => {
          if (chat.uuid && chat.etiqueta_ids) {
            map[chat.uuid] = chat.etiqueta_ids
          }
        })
        setChatEtiquetasMap(map)
      }
    } catch (error) {
      console.error("Error fetching chat etiquetas:", error)
    }
  }

  // Carrega mapeamento de chats -> atribuições
  const fetchChatAssignmentsMap = async (chatUuids: string[]) => {
    if (chatUuids.length === 0) return

    try {
      // Primeiro, pega os IDs dos chats a partir dos UUIDs
      const { data: chatsData } = await supabase
        .from("chats")
        .select("id, uuid")
        .in("uuid", chatUuids)

      if (!chatsData || chatsData.length === 0) return

      // Preenche o mapa de uuid -> id
      const uuidToIdMap: Record<string, string> = {}
      chatsData.forEach(chat => {
        if (chat.uuid) {
          uuidToIdMap[chat.uuid] = chat.id
        }
      })
      setChatIdMap(uuidToIdMap)

      const chatIds = chatsData.map(c => c.id)

      // Busca atribuições ativas
      const { data: assignmentsData } = await supabase
        .from("chat_assignments")
        .select("chat_id, assigned_to_id")
        .in("chat_id", chatIds)
        .eq("status", "active")

      if (!assignmentsData || assignmentsData.length === 0) return

      // Busca perfis dos usuários atribuídos
      const userIds = Array.from(new Set(assignmentsData.map(a => a.assigned_to_id)))
      const { data: profiles } = await supabase
        .from("perfis")
        .select("id, nome, cargo")
        .in("id", userIds)

      // Busca cores dos cargos
      const cargos = Array.from(new Set(profiles?.map(p => p.cargo).filter(Boolean) as string[]))
      const { data: cargosData } = await supabase
        .from("cargos")
        .select("nome, cor")
        .in("nome", cargos)

      const coresMap: Record<string, string> = {}
      cargosData?.forEach(c => coresMap[c.nome] = c.cor)

      // Monta o mapa uuid -> assignment
      const map: Record<string, { assigned_to_name: string; assigned_to_cargo?: string; assigned_to_color?: string }> = {}
      
      assignmentsData.forEach(assignment => {
        const chat = chatsData.find(c => c.id === assignment.chat_id)
        const profile = profiles?.find(p => p.id === assignment.assigned_to_id)
        
        if (chat?.uuid && profile) {
          map[chat.uuid] = {
            assigned_to_name: profile.nome || "",
            assigned_to_cargo: profile.cargo || undefined,
            assigned_to_color: profile.cargo ? coresMap[profile.cargo] : undefined
          }
        }
      })

      setChatAssignmentsMap(map)
    } catch (error) {
      console.error("Error fetching chat assignments:", error)
    }
  }

  // Carrega mapeamento de chats -> notas
  const fetchChatNotesMap = async (chatUuids: string[]) => {
    if (chatUuids.length === 0) return

    try {
      // Primeiro, pega os IDs dos chats a partir dos UUIDs
      const { data: chatsData } = await supabase
        .from("chats")
        .select("id, uuid")
        .in("uuid", chatUuids)

      if (!chatsData || chatsData.length === 0) return

      const chatIds = chatsData.map(c => c.id)

      // Busca notas
      const { data: notesData } = await supabase
        .from("chat_notes")
        .select("chat_id")
        .in("chat_id", chatIds)

      if (!notesData || notesData.length === 0) return

      // Monta o mapa uuid -> hasNotes
      const map: Record<string, boolean> = {}
      
      notesData.forEach(note => {
        const chat = chatsData.find(c => c.id === note.chat_id)
        if (chat?.uuid) {
          map[chat.uuid] = true
        }
      })

      setChatNotesMap(map)
    } catch (error) {
      console.error("Error fetching chat notes:", error)
    }
  }

  useEffect(() => {
    fetchEtiquetas()
    fetchAvailableUsers()
  }, [])

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

    // Carrega mapeamento de etiquetas, atribuições e notas para os chats vinculados
    const chatUuids = (data || [])
      .filter((lead) => lead.chat_uuid)
      .map((lead) => lead.chat_uuid as string)
    if (chatUuids.length > 0) {
      fetchChatEtiquetasMap(chatUuids)
      fetchChatAssignmentsMap(chatUuids)
      fetchChatNotesMap(chatUuids)
    }
  }

  // Handler para remover atribuição de um lead
  const handleRemoveAssignment = async (chatId: string, chatUuid: string) => {
    try {
      // Buscar a atribuição ativa
      const res = await fetch(`/api/whatsapp/assignment?chatId=${chatId}`)
      const data = await res.json()
      
      if (data.assignment?.id) {
        const deleteRes = await fetch("/api/whatsapp/assignment", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assignmentId: data.assignment.id, chatId })
        })
        
        if (deleteRes.ok) {
          toast.success("Atribuição removida")
          // Atualiza o mapa local removendo a atribuição
          setChatAssignmentsMap(prev => {
            const newMap = { ...prev }
            delete newMap[chatUuid]
            return newMap
          })
        } else {
          toast.error("Erro ao remover atribuição")
        }
      }
    } catch (error) {
      console.error("Erro ao remover atribuição:", error)
      toast.error("Erro ao remover atribuição")
    }
  }

  // Handler para remover etiqueta de um chat
  const handleRemoveEtiqueta = async (chatId: string, chatUuid: string, etiquetaId: string) => {
    try {
      const res = await fetch("/api/whatsapp/assign-tag", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, etiquetaId })
      })
      
      if (res.ok) {
        toast.success("Etiqueta removida")
        // Atualiza o mapa local removendo a etiqueta
        setChatEtiquetasMap(prev => {
          const newMap = { ...prev }
          if (newMap[chatUuid]) {
            newMap[chatUuid] = newMap[chatUuid].filter(id => id !== etiquetaId)
          }
          return newMap
        })
      } else {
        toast.error("Erro ao remover etiqueta")
      }
    } catch (error) {
      console.error("Erro ao remover etiqueta:", error)
      toast.error("Erro ao remover etiqueta")
    }
  }

  // Handler para atribuir/remover etiqueta direto do submenu
  const handleAssignEtiquetaFromSubmenu = async (lead: Lead, etiquetaId: string, isSelected: boolean) => {
    if (!lead.chat_uuid || !chatIdMap[lead.chat_uuid]) {
      toast.error("Este lead não está vinculado a um chat")
      return
    }
    const chatId = chatIdMap[lead.chat_uuid]
    
    try {
      if (isSelected) {
        const res = await fetch("/api/whatsapp/assign-tag", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, etiquetaId })
        })
        if (res.ok) {
          toast.success("Etiqueta removida")
          setChatEtiquetasMap(prev => {
            const newMap = { ...prev }
            if (newMap[lead.chat_uuid!]) {
              newMap[lead.chat_uuid!] = newMap[lead.chat_uuid!].filter(id => id !== etiquetaId)
            }
            return newMap
          })
        } else {
          toast.error("Erro ao remover etiqueta")
        }
      } else {
        const res = await fetch("/api/whatsapp/assign-tag", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatId, etiquetaId })
        })
        if (res.ok) {
          toast.success("Etiqueta atribuída")
          setChatEtiquetasMap(prev => {
            const newMap = { ...prev }
            if (!newMap[lead.chat_uuid!]) {
              newMap[lead.chat_uuid!] = []
            }
            newMap[lead.chat_uuid!] = [...newMap[lead.chat_uuid!], etiquetaId]
            return newMap
          })
        } else {
          toast.error("Erro ao atribuir etiqueta")
        }
      }
    } catch (error) {
      console.error("Erro ao processar etiqueta:", error)
      toast.error("Erro ao processar etiqueta")
    }
  }

  // Handler para atribuir usuário direto do submenu
  const handleAssignUserFromSubmenu = async (lead: Lead, userId: string, userName: string) => {
    if (!lead.chat_uuid || !chatIdMap[lead.chat_uuid]) {
      toast.error("Este lead não está vinculado a um chat")
      return
    }
    
    // Verificar se já está atribuído a esse usuário
    const currentAssignment = chatAssignmentsMap[lead.chat_uuid]
    if (currentAssignment?.assigned_to_name === userName) {
      toast.warning(`Este chat já está atribuído a ${userName}`)
      return
    }
    
    const chatId = chatIdMap[lead.chat_uuid]
    
    try {
      const response = await fetch("/api/whatsapp/assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          chatName: lead.nome,
          assignToId: userId,
          assignToName: userName,
          assignedById: user?.id,
          assignedByName: user?.nome || "Sistema"
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error('Empty response')
      }

      const data = JSON.parse(text)
      if (data.success) {
        toast.success(`Atribuído a ${userName}`)
        // Atualiza mapa local
        const userInfo = availableUsers.find(u => u.id === userId)
        setChatAssignmentsMap(prev => ({
          ...prev,
          [lead.chat_uuid!]: {
            assigned_to_name: userName,
            assigned_to_cargo: userInfo?.cargo,
            assigned_to_color: userInfo?.cor
          }
        }))
      } else if (data.alreadyAssigned) {
        toast.warning(data.message)
      } else {
        toast.error(data.message || "Erro ao atribuir")
      }
    } catch (error) {
      console.error("Erro ao atribuir:", error)
      toast.error("Erro ao atribuir")
    }
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
    let filtered = leads
    
    // Filtro "Apenas meus leads"
    if (onlyMyLeads && user) {
      filtered = filtered.filter((lead) => lead.adicionado_por_id === user.id)
    }
    
    // Filtros do painel
    if (activeFilters.length === 0) return filtered

    return filtered.filter((lead) => {
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
        if (filter.type === "etiqueta") {
          // Filtra por etiqueta via chat vinculado
          if (filter.value === "sem_etiqueta") {
            // Filtrar leads sem etiqueta
            if (!lead.chat_uuid) return true // Sem chat = sem etiqueta
            const leadEtiquetas = chatEtiquetasMap[lead.chat_uuid] || []
            return leadEtiquetas.length === 0
          }
          if (!lead.chat_uuid) return false
          const leadEtiquetas = chatEtiquetasMap[lead.chat_uuid] || []
          return leadEtiquetas.includes(filter.value)
        }
        return true
      })
    })
  }, [leads, activeFilters, onlyMyLeads, user, chatEtiquetasMap])

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

    if (!currentDate) {
      setActiveId(null)
      return
    }

    const dataAntigaFormatada = formatDate(parseDateFromDB(currentDate), "dd/MM/yyyy (EEEE)")
    const dataNovaFormatada = formatDate(parseDateFromDB(newDate), "dd/MM/yyyy (EEEE)")

    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, proximo_contato: newDate } : l)))

    const { error: updateError } = await supabase.from("leads").update({ proximo_contato: newDate }).eq("id", leadId)

    if (updateError) {
      console.error("Error updating lead:", updateError)
      toast.error("Erro ao mover lead")
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, proximo_contato: currentDate } : l)))
      setActiveId(null)
      return
    }

    await supabase.from("lead_logs").insert({
      lead_id: leadId,
      usuario_id: user.id,
      usuario_nome: user.nome,
      acao: "movido",
      de_data: currentDate,
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

    setConvertingLead(lead)
  }

  const handleUnconvertLead = async (lead: Lead) => {
    if (!user) return

    const canEdit =
      user.cargo === "Administrador" || user.cargo === "Desenvolvedor" || lead.adicionado_por_id === user.id

    if (!canEdit) {
      toast.error("Você não tem permissão para desconverter este lead")
      return
    }

    setUnconvertingLead(lead)
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
          <Button
            variant={onlyMyLeads ? "default" : "outline"}
            size="sm"
            onClick={() => setOnlyMyLeads(!onlyMyLeads)}
            className="gap-2"
          >
            {onlyMyLeads ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            Apenas meus leads
          </Button>
          <FilterPanel vendedores={uniqueVendedores} acoes={uniqueAcoes} etiquetas={etiquetas} onFiltersChange={setActiveFilters} />
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
                highlightedLeadId={highlightedLeadId}
                chatEtiquetasMap={chatEtiquetasMap}
                chatAssignmentsMap={chatAssignmentsMap}
                chatNotesMap={chatNotesMap}
                chatIdMap={chatIdMap}
                etiquetas={etiquetas}
                onRemoveAssignment={handleRemoveAssignment}
                onRemoveEtiqueta={handleRemoveEtiqueta}
                onShowEtiquetas={(lead) => {
                  if (lead.chat_uuid && chatIdMap[lead.chat_uuid]) {
                    const leadEtiquetaIds = chatEtiquetasMap[lead.chat_uuid] || []
                    const leadEtiquetas = leadEtiquetaIds
                      .map(id => etiquetas.find(e => e.id === id))
                      .filter(Boolean) as { id: string; nome: string; cor: string }[]
                    
                    setSelectedLeadForEtiquetas({
                      chatId: chatIdMap[lead.chat_uuid],
                      chatUuid: lead.chat_uuid,
                      etiquetas: leadEtiquetas
                    })
                    setShowEtiquetasDialog(true)
                  } else {
                    toast.error("Este lead não está vinculado a um chat")
                  }
                }}
                onShowNotes={(lead) => {
                  if (lead.chat_uuid && chatIdMap[lead.chat_uuid]) {
                    setSelectedLeadForNotes({
                      chatId: chatIdMap[lead.chat_uuid],
                      chatName: lead.nome,
                      chatUuid: lead.chat_uuid
                    })
                    setShowNotesDialog(true)
                  } else {
                    toast.error("Este lead não está vinculado a um chat")
                  }
                }}
                onAddEtiqueta={(lead) => {
                  if (lead.chat_uuid && chatIdMap[lead.chat_uuid]) {
                    const leadEtiquetaIds = chatEtiquetasMap[lead.chat_uuid] || []
                    setSelectedLeadForAddEtiqueta({
                      chatId: chatIdMap[lead.chat_uuid],
                      chatName: lead.nome,
                      chatUuid: lead.chat_uuid,
                      etiquetaIds: leadEtiquetaIds
                    })
                    setShowEtiquetaSelectorDialog(true)
                  } else {
                    toast.error("Este lead não está vinculado a um chat")
                  }
                }}
                availableUsers={availableUsers}
                onAssignEtiqueta={handleAssignEtiquetaFromSubmenu}
                onAssignUser={handleAssignUserFromSubmenu}
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

      <ViewLeadDialog 
        open={!!viewingLead} 
        onOpenChange={(open) => !open && setViewingLead(null)} 
        lead={viewingLead}
        onEdit={() => {
          if (viewingLead) {
            setViewingLead(null)
            setEditingLead(viewingLead)
          }
        }}
      />

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

      <ConvertLeadDialog
        open={!!convertingLead}
        onOpenChange={(open) => !open && setConvertingLead(null)}
        lead={convertingLead}
        onSuccess={fetchLeads}
      />

      <UnconvertLeadDialog
        open={!!unconvertingLead}
        onOpenChange={(open) => !open && setUnconvertingLead(null)}
        lead={unconvertingLead}
        onSuccess={fetchLeads}
      />

      {/* Diálogo para ver todas etiquetas */}
      {selectedLeadForEtiquetas && (
        <ChatEtiquetasDialog
          open={showEtiquetasDialog}
          onOpenChange={(open) => {
            setShowEtiquetasDialog(open)
            if (!open) setSelectedLeadForEtiquetas(null)
          }}
          chatId={selectedLeadForEtiquetas.chatId}
          etiquetas={selectedLeadForEtiquetas.etiquetas}
          onEtiquetaRemoved={() => {
            // Recarrega as etiquetas do lead
            const chatUuids = leads
              .filter((lead) => lead.chat_uuid)
              .map((lead) => lead.chat_uuid as string)
            if (chatUuids.length > 0) {
              fetchChatEtiquetasMap(chatUuids)
            }
          }}
        />
      )}

      {/* Diálogo de notas */}
      {selectedLeadForNotes && (
        <ChatNotesDialog
          open={showNotesDialog}
          onOpenChange={(open) => {
            setShowNotesDialog(open)
            if (!open) setSelectedLeadForNotes(null)
          }}
          chatId={selectedLeadForNotes.chatId}
          chatName={selectedLeadForNotes.chatName}
          onNotesChange={() => {
            // Atualiza o mapa de notas
            if (selectedLeadForNotes?.chatUuid) {
              setChatNotesMap(prev => ({
                ...prev,
                [selectedLeadForNotes.chatUuid]: true
              }))
            }
          }}
        />
      )}

      {/* Diálogo para adicionar etiqueta */}
      {selectedLeadForAddEtiqueta && (
        <EtiquetaSelectorDialog
          open={showEtiquetaSelectorDialog}
          onOpenChange={(open) => {
            setShowEtiquetaSelectorDialog(open)
            if (!open) setSelectedLeadForAddEtiqueta(null)
          }}
          chatId={selectedLeadForAddEtiqueta.chatId}
          chatName={selectedLeadForAddEtiqueta.chatName}
          currentEtiquetaIds={selectedLeadForAddEtiqueta.etiquetaIds}
          onEtiquetaChanged={() => {
            // Recarrega as etiquetas do lead
            const chatUuids = leads
              .filter((lead) => lead.chat_uuid)
              .map((lead) => lead.chat_uuid as string)
            if (chatUuids.length > 0) {
              fetchChatEtiquetasMap(chatUuids)
            }
          }}
        />
      )}
    </div>
  )
}
