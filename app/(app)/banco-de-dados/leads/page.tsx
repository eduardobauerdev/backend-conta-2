"use client"

import type React from "react"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown, CheckCircle, Download, UserPlus, Trash2, Filter, X, Edit, History } from "lucide-react"
import { formatDate, parseISO, subDays } from "@/lib/date-utils"
import type { Lead } from "@/types/crm"
import { toast } from "sonner"
import { AdminPasswordDialog } from "@/components/database/admin-password-dialog"
import { AssignSellerDialog } from "@/components/database/assign-seller-dialog"
import { DeleteLeadsConfirmDialog } from "@/components/database/delete-leads-confirm-dialog"
import { EditLeadDialog } from "@/components/database/edit-lead-dialog"
import { LeadHistoryDialog } from "@/components/database/lead-history-dialog"
import { ViewLeadDetailsDialog } from "@/components/database/view-lead-details-dialog"
import { cn } from "@/lib/utils"
import * as XLSX from "xlsx"

type SortField = "created_at" | "nome" | "cidade" | "temperatura" | "adicionado_por_nome" | "status"
type SortDirection = "asc" | "desc"

interface Filters {
  vendedor: string
  temperatura: string
  interesse: string
  periodo: string
  semContato: string
}

export default function LeadsTablePage() {
  const { user, loading: userLoading } = useUser()
  const router = useRouter()
  const supabase = createClient()

  const [leads, setLeads] = useState<Lead[]>([])
  const [sellers, setSellers] = useState<Array<{ id: string; nome: string }>>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    vendedor: "all",
    temperatura: "all",
    interesse: "",
    periodo: "all",
    semContato: "all",
  })

  const [adminDialogOpen, setAdminDialogOpen] = useState(false)
  const [adminAction, setAdminAction] = useState<"assign" | "export" | "delete" | null>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [selectedLeadForHistory, setSelectedLeadForHistory] = useState<{ id: string; nome: string } | null>(null)

  const [viewLeadDialogOpen, setViewLeadDialogOpen] = useState(false)
  const [viewingLead, setViewingLead] = useState<Lead | null>(null)

  useEffect(() => {
    if (!userLoading && user) {
      if (user.cargo !== "Administrador" && user.cargo !== "Desenvolvedor") {
        router.push("/visao-geral")
      } else {
        fetchAllLeads()
        fetchSellers()
      }
    }
  }, [user, userLoading, router])

  useEffect(() => {
    if (!user || (user.cargo !== "Administrador" && user.cargo !== "Desenvolvedor")) return

    const channel = supabase
      .channel("database-leads-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newLead = payload.new as Lead
            setLeads((prev) => {
              if (prev.some((l) => l.id === newLead.id)) return prev
              return [newLead, ...prev]
            })
          } else if (payload.eventType === "UPDATE") {
            const updatedLead = payload.new as Lead
            setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)))
          } else if (payload.eventType === "DELETE") {
            const deletedLead = payload.old as Lead
            setLeads((prev) => prev.filter((l) => l.id !== deletedLead.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const fetchAllLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching leads:", error)
      toast.error("Erro ao carregar leads")
    } else {
      setLeads(data || [])
    }
    setLoading(false)
  }

  const fetchSellers = async () => {
    const { data, error } = await supabase.from("perfis").select("id, nome").order("nome")

    if (error) {
      console.error("[v0] Error fetching sellers:", error)
    } else {
      setSellers(data || [])
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleRowClick = (leadId: string, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      const newSelected = new Set(selectedLeads)
      if (newSelected.has(leadId)) {
        newSelected.delete(leadId)
      } else {
        newSelected.add(leadId)
      }
      setSelectedLeads(newSelected)
    }
  }

  const handleSelectAll = () => {
    if (selectedLeads.size === filteredAndSortedLeads.length && filteredAndSortedLeads.length > 0) {
      setSelectedLeads(new Set())
    } else {
      setSelectedLeads(new Set(filteredAndSortedLeads.map((lead) => lead.id)))
    }
  }

  const handleEditLead = (lead: Lead, event: React.MouseEvent) => {
    event.stopPropagation()
    setEditingLead(lead)
    setEditDialogOpen(true)
  }

  const handleViewHistory = (lead: Lead, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedLeadForHistory({ id: lead.id, nome: lead.nome })
    setHistoryDialogOpen(true)
  }

  const handleViewLeadDetails = (lead: Lead, event: React.MouseEvent) => {
    event.stopPropagation()
    setViewingLead(lead)
    setViewLeadDialogOpen(true)
  }

  const handleBulkAssign = () => {
    if (selectedLeads.size === 0) {
      toast.error("Selecione pelo menos um lead")
      return
    }

    if (user?.cargo === "Administrador") {
      setAssignDialogOpen(true)
    } else {
      setAdminAction("assign")
      setAdminDialogOpen(true)
    }
  }

  const handleBulkExport = () => {
    if (selectedLeads.size === 0) {
      toast.error("Selecione pelo menos um lead")
      return
    }

    if (user?.cargo === "Administrador") {
      exportToExcel()
    } else {
      setAdminAction("export")
      setAdminDialogOpen(true)
    }
  }

  const handleBulkDelete = () => {
    if (selectedLeads.size === 0) {
      toast.error("Selecione pelo menos um lead")
      return
    }

    if (user?.cargo === "Administrador") {
      setDeleteDialogOpen(true)
    } else {
      setAdminAction("delete")
      setAdminDialogOpen(true)
    }
  }

  const exportToExcel = () => {
    const selectedLeadsData = leads.filter((lead) => selectedLeads.has(lead.id))

    const data = selectedLeadsData.map((lead) => ({
      "Data de Cadastro": formatDate(parseISO(lead.created_at), "dd/MM/yyyy HH:mm"),
      Nome: lead.nome,
      Cidade: lead.cidade || "",
      Interesse: lead.interesse || "",
      Telefone: lead.telefone || "",
      Vendedor: lead.adicionado_por_nome,
      Temperatura: lead.temperatura,
      Ação: lead.acao || "",
      Status: lead.status === "convertido" ? "Convertido" : "Ativo",
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads")

    XLSX.writeFile(workbook, `leads_${formatDate(new Date(), "yyyy-MM-dd")}.xlsx`)

    toast.success(`${selectedLeads.size} lead(s) exportado(s)`)
    setSelectedLeads(new Set())
  }

  const deleteLeads = async () => {
    try {
      const { error } = await supabase.from("leads").delete().in("id", Array.from(selectedLeads))

      if (error) throw error

      toast.success(`${selectedLeads.size} lead(s) deletado(s)`)
      setSelectedLeads(new Set())
      fetchAllLeads()
    } catch (error) {
      console.error("[v0] Error deleting leads:", error)
      toast.error("Erro ao deletar leads")
    }
  }

  const onAdminPasswordSuccess = () => {
    if (adminAction === "assign") {
      setAssignDialogOpen(true)
    } else if (adminAction === "export") {
      exportToExcel()
    } else if (adminAction === "delete") {
      setDeleteDialogOpen(true)
    }
    setAdminAction(null)
  }

  const clearFilters = () => {
    setFilters({
      vendedor: "all",
      temperatura: "all",
      interesse: "",
      periodo: "all",
      semContato: "all",
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "interesse") return value !== ""
    return value !== "all"
  })

  const filteredAndSortedLeads = useMemo(() => {
    const filtered = leads.filter((lead) => {
      // Global search
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        searchTerm === "" ||
        lead.nome?.toLowerCase().includes(searchLower) ||
        lead.cidade?.toLowerCase().includes(searchLower) ||
        lead.telefone?.toLowerCase().includes(searchLower) ||
        lead.endereco?.toLowerCase().includes(searchLower) ||
        lead.observacao?.toLowerCase().includes(searchLower) ||
        lead.adicionado_por_nome?.toLowerCase().includes(searchLower) ||
        lead.interesse?.toLowerCase().includes(searchLower)

      // Vendedor filter
      const matchesVendedor = filters.vendedor === "all" || lead.adicionado_por_id === filters.vendedor

      // Temperatura filter
      const matchesTemperatura = filters.temperatura === "all" || lead.temperatura === filters.temperatura

      // Interesse filter
      const matchesInteresse = filters.interesse === "" || lead.interesse?.includes(filters.interesse)

      // Periodo filter (cadastrados nos últimos X dias)
      const matchesPeriodo = (() => {
        if (filters.periodo === "all") return true
        const days = Number.parseInt(filters.periodo)
        const leadDate = parseISO(lead.created_at)
        const cutoffDate = subDays(new Date(), days)
        return leadDate >= cutoffDate
      })()

      // Sem contato filter
      const matchesSemContato = (() => {
        if (filters.semContato === "all") return true
        if (!lead.proximo_contato) return false
        const days = Number.parseInt(filters.semContato)
        const contactDate = parseISO(lead.proximo_contato)
        const cutoffDate = subDays(new Date(), days)
        return contactDate <= cutoffDate
      })()

      return (
        matchesSearch &&
        matchesVendedor &&
        matchesTemperatura &&
        matchesInteresse &&
        matchesPeriodo &&
        matchesSemContato
      )
    })

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (aVal === null) aVal = ""
      if (bVal === null) bVal = ""

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      return 0
    })

    return filtered
  }, [leads, searchTerm, filters, sortField, sortDirection])

  const getTemperaturaColor = (temp: string) => {
    switch (temp) {
      case "Quente":
        return "bg-red-100 text-red-700 border-red-300"
      case "Morno":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "Frio":
        return "bg-blue-100 text-blue-700 border-blue-300"
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-300"
    }
  }

  const getStatusColor = (status: string | null) => {
    if (status === "convertido") {
      return "bg-green-100 text-green-700 border-green-300"
    }
    return "bg-neutral-100 text-neutral-700 border-neutral-300"
  }

  if (userLoading || loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  if (!user || (user.cargo !== "Administrador" && user.cargo !== "Desenvolvedor")) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Spinner className="w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Banco de Dados - Leads</h1>
        <p className="text-neutral-600 mt-1">Visualização completa com filtros avançados e ações em massa</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Buscar por nome, telefone, endereço, observações, cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-600">
              {filteredAndSortedLeads.length} {filteredAndSortedLeads.length === 1 ? "lead" : "leads"}
              {selectedLeads.size > 0 && ` (${selectedLeads.size} selecionado${selectedLeads.size > 1 ? "s" : ""})`}
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <Badge className="ml-1 bg-primary text-primary-foreground">
                  {Object.values(filters).filter((v) => v !== "all" && v !== "").length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-neutral-50 border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Filtros Avançados</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <X className="w-3 h-3" />
                  Limpar Filtros
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vendedor</label>
                <Select value={filters.vendedor} onValueChange={(v) => setFilters({ ...filters, vendedor: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {sellers.map((seller) => (
                      <SelectItem key={seller.id} value={seller.id}>
                        {seller.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Temperatura</label>
                <Select value={filters.temperatura} onValueChange={(v) => setFilters({ ...filters, temperatura: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Quente">Quente</SelectItem>
                    <SelectItem value="Morno">Morno</SelectItem>
                    <SelectItem value="Frio">Frio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Interesse</label>
                <Input
                  placeholder="Filtrar por interesse"
                  value={filters.interesse}
                  onChange={(e) => setFilters({ ...filters, interesse: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cadastrados em</label>
                <Select value={filters.periodo} onValueChange={(v) => setFilters({ ...filters, periodo: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os períodos</SelectItem>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="60">Últimos 60 dias</SelectItem>
                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sem contato há</label>
                <Select value={filters.semContato} onValueChange={(v) => setFilters({ ...filters, semContato: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="30">Mais de 30 dias</SelectItem>
                    <SelectItem value="60">Mais de 60 dias</SelectItem>
                    <SelectItem value="90">Mais de 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {selectedLeads.size > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
            <div className="text-sm font-medium">
              {selectedLeads.size} lead{selectedLeads.size > 1 ? "s" : ""} selecionado
              {selectedLeads.size > 1 ? "s" : ""}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkAssign} className="gap-2 bg-transparent">
                <UserPlus className="w-4 h-4" />
                Atribuir Vendedor
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkExport} className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exportar Excel
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="gap-2">
                <Trash2 className="w-4 h-4" />
                Deletar
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedLeads.size === filteredAndSortedLeads.length && filteredAndSortedLeads.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-neutral-300 cursor-pointer"
                  />
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("created_at")}
                    className="flex items-center gap-1 -ml-3"
                  >
                    Data de Cadastro
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("nome")}
                    className="flex items-center gap-1 -ml-3"
                  >
                    Nome
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("cidade")}
                    className="flex items-center gap-1 -ml-3"
                  >
                    Cidade
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead>Interesse</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("adicionado_por_nome")}
                    className="flex items-center gap-1 -ml-3"
                  >
                    Vendedor
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("temperatura")}
                    className="flex items-center gap-1 -ml-3"
                  >
                    Temperatura
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 -ml-3"
                  >
                    Status
                    <ArrowUpDown className="w-3 h-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  onClick={(e) => handleRowClick(lead.id, e)}
                  className={cn("cursor-pointer hover:bg-neutral-50", selectedLeads.has(lead.id) && "bg-primary/5")}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedLeads.has(lead.id)}
                      onChange={() => {
                        const newSelected = new Set(selectedLeads)
                        if (newSelected.has(lead.id)) {
                          newSelected.delete(lead.id)
                        } else {
                          newSelected.add(lead.id)
                        }
                        setSelectedLeads(newSelected)
                      }}
                      className="w-4 h-4 rounded border-neutral-300 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="text-sm text-neutral-600">
                    {formatDate(parseISO(lead.created_at), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell
                    className="font-medium text-primary hover:underline cursor-pointer"
                    onClick={(e) => handleViewLeadDetails(lead, e)}
                  >
                    {lead.nome}
                  </TableCell>
                  <TableCell>{lead.cidade || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate">{lead.interesse || "-"}</TableCell>
                  <TableCell>{lead.telefone || "-"}</TableCell>
                  <TableCell>{lead.adicionado_por_nome}</TableCell>
                  <TableCell>
                    <Badge className={getTemperaturaColor(lead.temperatura)}>{lead.temperatura}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{lead.acao || "-"}</TableCell>
                  <TableCell>
                    {lead.status === "convertido" ? (
                      <Badge className={getStatusColor(lead.status)}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Convertido
                      </Badge>
                    ) : (
                      <Badge className={getStatusColor(lead.status)}>Ativo</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleViewHistory(lead, e)}
                        className="gap-2"
                        title="Ver histórico de alterações"
                      >
                        <History className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => handleEditLead(lead, e)} className="gap-2">
                        <Edit className="w-4 h-4" />
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAndSortedLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-neutral-500">
                    Nenhum lead encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AdminPasswordDialog
        open={adminDialogOpen}
        onOpenChange={setAdminDialogOpen}
        onSuccess={onAdminPasswordSuccess}
        action={
          adminAction === "assign"
            ? "atribuir leads a um vendedor"
            : adminAction === "export"
              ? "exportar leads"
              : "deletar leads"
        }
      />

      <AssignSellerDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        selectedLeadIds={Array.from(selectedLeads)}
        onSuccess={() => {
          fetchAllLeads()
          setSelectedLeads(new Set())
        }}
      />

      <DeleteLeadsConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        selectedCount={selectedLeads.size}
        onConfirm={deleteLeads}
      />

      <EditLeadDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        lead={editingLead}
        onSuccess={fetchAllLeads}
      />

      <LeadHistoryDialog
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        leadId={selectedLeadForHistory?.id || null}
        leadName={selectedLeadForHistory?.nome || ""}
      />

      <ViewLeadDetailsDialog open={viewLeadDialogOpen} onOpenChange={setViewLeadDialogOpen} lead={viewingLead} />
    </div>
  )
}
