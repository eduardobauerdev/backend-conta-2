"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { Search, Pencil, Trash2, Briefcase } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ViewRolesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditRole: (role: any) => void
  onRefresh: () => void
}

interface Role {
  id: string
  nome: string
  cor: string
  descricao: string | null
  created_at: string
  created_by_nome: string | null
}

export function ViewRolesDialog({ open, onOpenChange, onEditRole, onRefresh }: ViewRolesDialogProps) {
  const supabase = createClient()
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      fetchRoles()
    }
  }, [open])

  const fetchRoles = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("cargos").select("*").order("nome")

    if (error) {
      console.error("[ViewRolesDialog] Error fetching roles:", error)
      toast.error("Erro ao carregar cargos")
    } else {
      setRoles(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (roleId: string, roleName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o cargo "${roleName}"?`)) {
      return
    }

    setDeletingId(roleId)

    try {
      const { error } = await supabase.from("cargos").delete().eq("id", roleId)

      if (error) {
        console.error("[ViewRolesDialog] Error deleting role:", error)
        toast.error("Erro ao excluir cargo")
        return
      }

      toast.success("Cargo excluído com sucesso!")
      fetchRoles()
      onRefresh()
    } catch (error) {
      console.error("[ViewRolesDialog] Error:", error)
      toast.error("Erro ao excluir cargo")
    } finally {
      setDeletingId(null)
    }
  }

  const filteredRoles = roles.filter((role) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      role.nome.toLowerCase().includes(searchLower) ||
      (role.descricao && role.descricao.toLowerCase().includes(searchLower))
    )
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Ver Cargos
          </DialogTitle>
          <DialogDescription>Visualize, edite ou exclua os cargos existentes</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Roles Table */}
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="w-6 h-6" />
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Criado por</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border"
                          style={{
                            backgroundColor: role.cor + "20",
                            borderColor: role.cor,
                            color: role.cor,
                          }}
                        >
                          {role.nome}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {role.descricao || <span className="italic text-neutral-400">Sem descrição</span>}
                      </TableCell>
                      <TableCell className="text-sm text-neutral-600">
                        {role.created_by_nome || <span className="italic text-neutral-400">Sistema</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onEditRole(role)
                              onOpenChange(false)
                            }}
                            className="gap-2"
                          >
                            <Pencil className="w-4 h-4" />
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(role.id, role.nome)}
                            disabled={deletingId === role.id}
                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            {deletingId === role.id ? (
                              <Spinner className="w-4 h-4" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRoles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-neutral-500">
                        Nenhum cargo encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
