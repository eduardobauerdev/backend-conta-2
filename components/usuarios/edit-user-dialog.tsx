"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface UserProfile {
  id: string
  nome: string
  email: string
  cargo: string
  senha: string
  ultimo_login: string | null
  dispositivo_login: string | null
  created_at: string
  foto_perfil: string | null
}

interface UserPermissions {
  can_view_leads: boolean
  can_create_leads: boolean
  can_edit_own_leads: boolean
  can_edit_all_leads: boolean
  can_delete_leads: boolean
  can_export_leads: boolean
  can_assign_leads: boolean
  can_access_crm: boolean
  can_convert_leads: boolean
  can_access_database: boolean
  can_view_all_leads: boolean
  can_view_users: boolean
  can_create_users: boolean
  can_edit_users: boolean
  can_delete_users: boolean
  can_create_invites: boolean
  can_access_contracts: boolean
  can_create_contracts: boolean
  can_edit_contracts: boolean
  can_access_orders: boolean
  can_create_orders: boolean
  can_edit_orders: boolean
  can_access_settings: boolean
  can_view_audit_logs: boolean
  can_manage_system: boolean
}

interface Role {
  nome: string
  cor: string
}

type EditUserDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserProfile | null
  onSuccess: () => void
}

export function EditUserDialog({ open, onOpenChange, user, onSuccess }: EditUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    senha: "",
  })
  const [permissions, setPermissions] = useState<UserPermissions>({
    can_view_leads: true,
    can_create_leads: true,
    can_edit_own_leads: true,
    can_edit_all_leads: false,
    can_delete_leads: false,
    can_export_leads: false,
    can_assign_leads: false,
    can_access_crm: true,
    can_convert_leads: true,
    can_access_database: false,
    can_view_all_leads: false,
    can_view_users: false,
    can_create_users: false,
    can_edit_users: false,
    can_delete_users: false,
    can_create_invites: false,
    can_access_contracts: false,
    can_create_contracts: false,
    can_edit_contracts: false,
    can_access_orders: false,
    can_create_orders: false,
    can_edit_orders: false,
    can_access_settings: false,
    can_view_audit_logs: false,
    can_manage_system: false,
  })
  const [roles, setRoles] = useState<Role[]>([])
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        senha: user.senha,
      })
      fetchUserPermissions(user.id)
    }
  }, [user])

  useEffect(() => {
    if (open) {
      fetchRoles()
    }
  }, [open])

  const fetchRoles = async () => {
    const { data, error } = await supabase.from("cargos").select("nome, cor").order("nome")

    if (error) {
      console.error("[v0] Error fetching roles:", error)
    } else {
      setRoles(data || [])
    }
  }

  const fetchUserPermissions = async (userId: string) => {
    const { data, error } = await supabase.from("user_permissions").select("*").eq("user_id", userId).single()

    if (error) {
      console.error("[v0] Error fetching permissions:", error)
    } else if (data) {
      setPermissions(data as UserPermissions)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setIsSubmitting(true)

    // Update user profile
    const { error: profileError } = await supabase
      .from("perfis")
      .update({
        nome: formData.nome,
        email: formData.email,
        cargo: formData.cargo,
        senha: formData.senha,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (profileError) {
      console.error("[v0] Error updating user:", profileError)
      toast.error("Erro ao atualizar usuário")
      setIsSubmitting(false)
      return
    }

    // Update or insert permissions
    const { error: permissionsError } = await supabase.from("user_permissions").upsert({
      user_id: user.id,
      ...permissions,
      updated_at: new Date().toISOString(),
    })

    if (permissionsError) {
      console.error("[v0] Error updating permissions:", permissionsError)
      toast.error("Erro ao atualizar permissões")
      setIsSubmitting(false)
      return
    }

    toast.success("Usuário e permissões atualizados com sucesso")
    setIsSubmitting(false)
    onOpenChange(false)
    onSuccess()
  }

  const updatePermission = (key: keyof UserPermissions, value: boolean) => {
    setPermissions((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>Atualize as informações e permissões do usuário</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Dados Básicos */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Dados Básicos</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Select value={formData.cargo} onValueChange={(value) => setFormData({ ...formData, cargo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.nome} value={role.nome}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.cor }} />
                            {role.nome}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="text"
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    required
                  />
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
