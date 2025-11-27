"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { useUser } from "@/contexts/user-context"
import { Briefcase } from "lucide-react"

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

interface RolePermissions {
  can_view_leads: boolean
  can_create_leads: boolean
  can_edit_own_leads: boolean
  can_edit_all_leads: boolean
  can_delete_leads: boolean
  can_export_leads: boolean
  can_assign_leads: boolean
  can_convert_leads: boolean
  can_view_all_leads: boolean
  can_access_crm: boolean
  can_access_database: boolean
  can_access_contracts: boolean
  can_access_orders: boolean
  can_access_settings: boolean
  can_view_users: boolean
  can_create_users: boolean
  can_edit_users: boolean
  can_delete_users: boolean
  can_create_invites: boolean
  can_create_contracts: boolean
  can_edit_contracts: boolean
  can_create_orders: boolean
  can_edit_orders: boolean
  can_view_audit_logs: boolean
  can_manage_system: boolean
}

export function CreateRoleDialog({ open, onOpenChange, onSuccess }: CreateRoleDialogProps) {
  const supabase = createClient()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    cor: "#3b82f6",
    descricao: "",
  })
  const [permissions, setPermissions] = useState<RolePermissions>({
    can_view_leads: false,
    can_create_leads: false,
    can_edit_own_leads: false,
    can_edit_all_leads: false,
    can_delete_leads: false,
    can_export_leads: false,
    can_assign_leads: false,
    can_convert_leads: false,
    can_view_all_leads: false,
    can_access_crm: false,
    can_access_database: false,
    can_access_contracts: false,
    can_access_orders: false,
    can_access_settings: false,
    can_view_users: false,
    can_create_users: false,
    can_edit_users: false,
    can_delete_users: false,
    can_create_invites: false,
    can_create_contracts: false,
    can_edit_contracts: false,
    can_create_orders: false,
    can_edit_orders: false,
    can_view_audit_logs: false,
    can_manage_system: false,
  })

  const updatePermission = (key: keyof RolePermissions, value: boolean) => {
    setPermissions((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.cor) {
      toast.error("Preencha o nome e a cor do cargo")
      return
    }

    setLoading(true)

    try {
      // Check if role already exists
      const { data: existingRole } = await supabase.from("cargos").select("id").eq("nome", formData.nome).single()

      if (existingRole) {
        toast.error("Já existe um cargo com este nome")
        setLoading(false)
        return
      }

      // Create new role
      const { error: roleError } = await supabase.from("cargos").insert([
        {
          nome: formData.nome,
          cor: formData.cor,
          descricao: formData.descricao,
          created_by_id: user?.id,
          created_by_nome: user?.nome,
        },
      ])

      if (roleError) {
        console.error("[v0] Error creating role:", roleError)
        toast.error("Erro ao criar cargo")
        setLoading(false)
        return
      }

      // Create permissions for the role
      const { error: permissionsError } = await supabase.from("cargo_permissions").insert([
        {
          cargo_nome: formData.nome,
          ...permissions,
        },
      ])

      if (permissionsError) {
        console.error("[v0] Error creating role permissions:", permissionsError)
        toast.error("Erro ao criar permissões do cargo")
        setLoading(false)
        return
      }

      toast.success("Cargo criado com sucesso!")
      onSuccess()
      onOpenChange(false)
      setFormData({ nome: "", cor: "#3b82f6", descricao: "" })
      setPermissions({
        can_view_leads: false,
        can_create_leads: false,
        can_edit_own_leads: false,
        can_edit_all_leads: false,
        can_delete_leads: false,
        can_export_leads: false,
        can_assign_leads: false,
        can_convert_leads: false,
        can_view_all_leads: false,
        can_access_crm: false,
        can_access_database: false,
        can_access_contracts: false,
        can_access_orders: false,
        can_access_settings: false,
        can_view_users: false,
        can_create_users: false,
        can_edit_users: false,
        can_delete_users: false,
        can_create_invites: false,
        can_create_contracts: false,
        can_edit_contracts: false,
        can_create_orders: false,
        can_edit_orders: false,
        can_view_audit_logs: false,
        can_manage_system: false,
      })
    } catch (error) {
      console.error("[v0] Error:", error)
      toast.error("Erro ao criar cargo")
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Criar Novo Cargo
          </DialogTitle>
          <DialogDescription>Defina o nome, cor e permissões do novo cargo</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Dados do Cargo</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do cargo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Gerente de Vendas"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor">Cor do cargo</Label>
                <div className="flex gap-2">
                  <Input
                    id="cor"
                    type="color"
                    value={formData.cor}
                    onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                    className="w-20 h-10 cursor-pointer"
                    disabled={loading}
                  />
                  <Input
                    value={formData.cor}
                    onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição (opcional)</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descreva as responsabilidades deste cargo..."
                disabled={loading}
                rows={3}
              />
            </div>

            {/* Preview Badge */}
            <div className="space-y-2">
              <Label>Preview do badge</Label>
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: formData.cor + "20",
                  borderColor: formData.cor,
                  color: formData.cor,
                }}
              >
                {formData.nome || "Nome do cargo"}
              </div>
            </div>
          </div>

          <Separator />

          {/* Permissões */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Permissões</h3>

            {/* Leads */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600">Leads</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_view_leads"
                    checked={permissions.can_view_leads}
                    onCheckedChange={(checked) => updatePermission("can_view_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_view_leads" className="text-sm font-normal cursor-pointer">
                    Visualizar leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_create_leads"
                    checked={permissions.can_create_leads}
                    onCheckedChange={(checked) => updatePermission("can_create_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_create_leads" className="text-sm font-normal cursor-pointer">
                    Criar leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_edit_own_leads"
                    checked={permissions.can_edit_own_leads}
                    onCheckedChange={(checked) => updatePermission("can_edit_own_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_edit_own_leads" className="text-sm font-normal cursor-pointer">
                    Editar próprios leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_edit_all_leads"
                    checked={permissions.can_edit_all_leads}
                    onCheckedChange={(checked) => updatePermission("can_edit_all_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_edit_all_leads" className="text-sm font-normal cursor-pointer">
                    Editar todos os leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_delete_leads"
                    checked={permissions.can_delete_leads}
                    onCheckedChange={(checked) => updatePermission("can_delete_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_delete_leads" className="text-sm font-normal cursor-pointer">
                    Deletar leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_export_leads"
                    checked={permissions.can_export_leads}
                    onCheckedChange={(checked) => updatePermission("can_export_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_export_leads" className="text-sm font-normal cursor-pointer">
                    Exportar leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_assign_leads"
                    checked={permissions.can_assign_leads}
                    onCheckedChange={(checked) => updatePermission("can_assign_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_assign_leads" className="text-sm font-normal cursor-pointer">
                    Atribuir leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_convert_leads"
                    checked={permissions.can_convert_leads}
                    onCheckedChange={(checked) => updatePermission("can_convert_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_convert_leads" className="text-sm font-normal cursor-pointer">
                    Converter leads
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_view_all_leads"
                    checked={permissions.can_view_all_leads}
                    onCheckedChange={(checked) => updatePermission("can_view_all_leads", checked as boolean)}
                  />
                  <Label htmlFor="can_view_all_leads" className="text-sm font-normal cursor-pointer">
                    Ver todos os leads
                  </Label>
                </div>
              </div>
            </div>

            {/* Acesso a Módulos */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600">Acesso a Módulos</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_access_crm"
                    checked={permissions.can_access_crm}
                    onCheckedChange={(checked) => updatePermission("can_access_crm", checked as boolean)}
                  />
                  <Label htmlFor="can_access_crm" className="text-sm font-normal cursor-pointer">
                    Acessar CRM
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_access_database"
                    checked={permissions.can_access_database}
                    onCheckedChange={(checked) => updatePermission("can_access_database", checked as boolean)}
                  />
                  <Label htmlFor="can_access_database" className="text-sm font-normal cursor-pointer">
                    Acessar Banco de Dados
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_access_contracts"
                    checked={permissions.can_access_contracts}
                    onCheckedChange={(checked) => updatePermission("can_access_contracts", checked as boolean)}
                  />
                  <Label htmlFor="can_access_contracts" className="text-sm font-normal cursor-pointer">
                    Acessar Contratos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_access_orders"
                    checked={permissions.can_access_orders}
                    onCheckedChange={(checked) => updatePermission("can_access_orders", checked as boolean)}
                  />
                  <Label htmlFor="can_access_orders" className="text-sm font-normal cursor-pointer">
                    Acessar Ordens de Serviço
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_access_settings"
                    checked={permissions.can_access_settings}
                    onCheckedChange={(checked) => updatePermission("can_access_settings", checked as boolean)}
                  />
                  <Label htmlFor="can_access_settings" className="text-sm font-normal cursor-pointer">
                    Acessar Ajustes
                  </Label>
                </div>
              </div>
            </div>

            {/* Usuários */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600">Gerenciamento de Usuários</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_view_users"
                    checked={permissions.can_view_users}
                    onCheckedChange={(checked) => updatePermission("can_view_users", checked as boolean)}
                  />
                  <Label htmlFor="can_view_users" className="text-sm font-normal cursor-pointer">
                    Visualizar usuários
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_create_users"
                    checked={permissions.can_create_users}
                    onCheckedChange={(checked) => updatePermission("can_create_users", checked as boolean)}
                  />
                  <Label htmlFor="can_create_users" className="text-sm font-normal cursor-pointer">
                    Criar usuários
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_edit_users"
                    checked={permissions.can_edit_users}
                    onCheckedChange={(checked) => updatePermission("can_edit_users", checked as boolean)}
                  />
                  <Label htmlFor="can_edit_users" className="text-sm font-normal cursor-pointer">
                    Editar usuários
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_delete_users"
                    checked={permissions.can_delete_users}
                    onCheckedChange={(checked) => updatePermission("can_delete_users", checked as boolean)}
                  />
                  <Label htmlFor="can_delete_users" className="text-sm font-normal cursor-pointer">
                    Deletar usuários
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_create_invites"
                    checked={permissions.can_create_invites}
                    onCheckedChange={(checked) => updatePermission("can_create_invites", checked as boolean)}
                  />
                  <Label htmlFor="can_create_invites" className="text-sm font-normal cursor-pointer">
                    Criar convites
                  </Label>
                </div>
              </div>
            </div>

            {/* Contratos e Ordens */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600">Contratos e Ordens de Serviço</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_create_contracts"
                    checked={permissions.can_create_contracts}
                    onCheckedChange={(checked) => updatePermission("can_create_contracts", checked as boolean)}
                  />
                  <Label htmlFor="can_create_contracts" className="text-sm font-normal cursor-pointer">
                    Criar contratos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_edit_contracts"
                    checked={permissions.can_edit_contracts}
                    onCheckedChange={(checked) => updatePermission("can_edit_contracts", checked as boolean)}
                  />
                  <Label htmlFor="can_edit_contracts" className="text-sm font-normal cursor-pointer">
                    Editar contratos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_create_orders"
                    checked={permissions.can_create_orders}
                    onCheckedChange={(checked) => updatePermission("can_create_orders", checked as boolean)}
                  />
                  <Label htmlFor="can_create_orders" className="text-sm font-normal cursor-pointer">
                    Criar ordens de serviço
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_edit_orders"
                    checked={permissions.can_edit_orders}
                    onCheckedChange={(checked) => updatePermission("can_edit_orders", checked as boolean)}
                  />
                  <Label htmlFor="can_edit_orders" className="text-sm font-normal cursor-pointer">
                    Editar ordens de serviço
                  </Label>
                </div>
              </div>
            </div>

            {/* Sistema */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600">Sistema</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_view_audit_logs"
                    checked={permissions.can_view_audit_logs}
                    onCheckedChange={(checked) => updatePermission("can_view_audit_logs", checked as boolean)}
                  />
                  <Label htmlFor="can_view_audit_logs" className="text-sm font-normal cursor-pointer">
                    Visualizar logs de auditoria
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="can_manage_system"
                    checked={permissions.can_manage_system}
                    onCheckedChange={(checked) => updatePermission("can_manage_system", checked as boolean)}
                  />
                  <Label htmlFor="can_manage_system" className="text-sm font-normal cursor-pointer">
                    Gerenciar sistema
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Criando...
                </>
              ) : (
                "Criar Cargo"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
