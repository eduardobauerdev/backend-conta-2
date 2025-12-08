"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ColorPalette } from "@/components/ui/color-palette"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { useUser } from "@/contexts/user-context"
import { Briefcase } from "lucide-react"

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  copyFromRole?: any | null
}

interface RolePermissions {
  // Leads - Visualização
  can_view_leads: boolean
  can_view_own_leads: boolean
  can_view_all_leads: boolean
  can_view_lead_details: boolean
  can_view_lead_history: boolean
  
  // Leads - Criação e Edição
  can_create_leads: boolean
  can_edit_own_leads: boolean
  can_edit_all_leads: boolean
  can_delete_own_leads: boolean
  can_delete_all_leads: boolean
  can_import_leads: boolean
  can_export_leads: boolean
  can_bulk_edit_leads: boolean
  
  // Leads - Ações
  can_assign_leads: boolean
  can_reassign_leads: boolean
  can_convert_leads: boolean
  can_mark_lead_lost: boolean
  can_add_lead_notes: boolean
  can_edit_lead_notes: boolean
  can_delete_lead_notes: boolean
  
  // WhatsApp - Visualização
  can_view_whatsapp: boolean
  can_view_all_chats: boolean
  can_view_assigned_chats: boolean
  can_view_chat_history: boolean
  
  // WhatsApp - Ações
  can_send_messages: boolean
  can_send_media: boolean
  can_use_quick_replies: boolean
  can_create_quick_replies: boolean
  can_manage_quick_replies: boolean
  can_assign_chats: boolean
  can_transfer_chats: boolean
  can_manage_tags: boolean
  can_add_chat_notes: boolean
  
  // CRM - Acesso
  can_access_crm: boolean
  can_view_crm_calendar: boolean
  can_edit_crm_calendar: boolean
  can_manage_crm_pipeline: boolean
  
  // Banco de Dados
  can_access_database: boolean
  can_view_all_database: boolean
  can_export_database: boolean
  can_import_database: boolean
  can_bulk_delete_database: boolean
  
  // Contratos
  can_access_contracts: boolean
  can_view_contracts: boolean
  can_create_contracts: boolean
  can_edit_own_contracts: boolean
  can_edit_all_contracts: boolean
  can_delete_contracts: boolean
  can_approve_contracts: boolean
  can_generate_contract_pdf: boolean
  
  // Ordens de Serviço
  can_access_orders: boolean
  can_view_orders: boolean
  can_create_orders: boolean
  can_edit_own_orders: boolean
  can_edit_all_orders: boolean
  can_delete_orders: boolean
  can_approve_orders: boolean
  can_generate_order_pdf: boolean
  
  // Catálogo
  can_access_catalog: boolean
  can_view_products: boolean
  can_create_products: boolean
  can_edit_products: boolean
  can_delete_products: boolean
  can_manage_categories: boolean
  can_manage_pricing: boolean
  
  // Usuários
  can_access_users: boolean
  can_view_users: boolean
  can_view_user_details: boolean
  can_create_users: boolean
  can_edit_users: boolean
  can_delete_users: boolean
  can_manage_roles: boolean
  can_create_invites: boolean
  can_view_user_activity: boolean
  
  // Configurações
  can_access_settings: boolean
  can_edit_company_settings: boolean
  can_manage_integrations: boolean
  can_manage_whatsapp_config: boolean
  can_manage_email_config: boolean
  can_manage_payment_config: boolean
  
  // Relatórios e Analytics
  can_view_reports: boolean
  can_view_analytics: boolean
  can_export_reports: boolean
  can_view_sales_reports: boolean
  can_view_team_performance: boolean
  can_view_financial_reports: boolean
  
  // Sistema
  can_view_audit_logs: boolean
  can_manage_system: boolean
  can_manage_backups: boolean
  can_view_system_logs: boolean
  can_manage_api_keys: boolean
}

export function CreateRoleDialog({ open, onOpenChange, onSuccess, copyFromRole }: CreateRoleDialogProps) {
  const supabase = createClient()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    cor: "#3b82f6",
    descricao: "",
  })
  const [permissions, setPermissions] = useState<RolePermissions>({
    // Leads - Visualização
    can_view_leads: false,
    can_view_own_leads: false,
    can_view_all_leads: false,
    can_view_lead_details: false,
    can_view_lead_history: false,
    
    // Leads - Criação e Edição
    can_create_leads: false,
    can_edit_own_leads: false,
    can_edit_all_leads: false,
    can_delete_own_leads: false,
    can_delete_all_leads: false,
    can_import_leads: false,
    can_export_leads: false,
    can_bulk_edit_leads: false,
    
    // Leads - Ações
    can_assign_leads: false,
    can_reassign_leads: false,
    can_convert_leads: false,
    can_mark_lead_lost: false,
    can_add_lead_notes: false,
    can_edit_lead_notes: false,
    can_delete_lead_notes: false,
    
    // WhatsApp - Visualização
    can_view_whatsapp: false,
    can_view_all_chats: false,
    can_view_assigned_chats: false,
    can_view_chat_history: false,
    
    // WhatsApp - Ações
    can_send_messages: false,
    can_send_media: false,
    can_use_quick_replies: false,
    can_create_quick_replies: false,
    can_manage_quick_replies: false,
    can_assign_chats: false,
    can_transfer_chats: false,
    can_manage_tags: false,
    can_add_chat_notes: false,
    
    // CRM - Acesso
    can_access_crm: false,
    can_view_crm_calendar: false,
    can_edit_crm_calendar: false,
    can_manage_crm_pipeline: false,
    
    // Banco de Dados
    can_access_database: false,
    can_view_all_database: false,
    can_export_database: false,
    can_import_database: false,
    can_bulk_delete_database: false,
    
    // Contratos
    can_access_contracts: false,
    can_view_contracts: false,
    can_create_contracts: false,
    can_edit_own_contracts: false,
    can_edit_all_contracts: false,
    can_delete_contracts: false,
    can_approve_contracts: false,
    can_generate_contract_pdf: false,
    
    // Ordens de Serviço
    can_access_orders: false,
    can_view_orders: false,
    can_create_orders: false,
    can_edit_own_orders: false,
    can_edit_all_orders: false,
    can_delete_orders: false,
    can_approve_orders: false,
    can_generate_order_pdf: false,
    
    // Catálogo
    can_access_catalog: false,
    can_view_products: false,
    can_create_products: false,
    can_edit_products: false,
    can_delete_products: false,
    can_manage_categories: false,
    can_manage_pricing: false,
    
    // Usuários
    can_access_users: false,
    can_view_users: false,
    can_view_user_details: false,
    can_create_users: false,
    can_edit_users: false,
    can_delete_users: false,
    can_manage_roles: false,
    can_create_invites: false,
    can_view_user_activity: false,
    
    // Configurações
    can_access_settings: false,
    can_edit_company_settings: false,
    can_manage_integrations: false,
    can_manage_whatsapp_config: false,
    can_manage_email_config: false,
    can_manage_payment_config: false,
    
    // Relatórios e Analytics
    can_view_reports: false,
    can_view_analytics: false,
    can_export_reports: false,
    can_view_sales_reports: false,
    can_view_team_performance: false,
    can_view_financial_reports: false,
    
    // Sistema
    can_view_audit_logs: false,
    can_manage_system: false,
    can_manage_backups: false,
    can_view_system_logs: false,
    can_manage_api_keys: false,
  })

  // Load permissions from copyFromRole when dialog opens
  useEffect(() => {
    if (open && copyFromRole) {
      const loadedPermissions: RolePermissions = { ...permissions }
      Object.keys(permissions).forEach((key) => {
        if (copyFromRole[key] !== undefined) {
          loadedPermissions[key as keyof RolePermissions] = copyFromRole[key]
        }
      })
      setPermissions(loadedPermissions)
      setFormData({
        nome: "",
        cor: copyFromRole.cor || "#3b82f6",
        descricao: `Baseado em: ${copyFromRole.nome}`,
      })
    } else if (open && !copyFromRole) {
      // Reset to defaults when opening without copy
      setFormData({ nome: "", cor: "#3b82f6", descricao: "" })
      setPermissions({
        can_view_leads: false,
        can_view_own_leads: false,
        can_view_all_leads: false,
        can_view_lead_details: false,
        can_view_lead_history: false,
        can_create_leads: false,
        can_edit_own_leads: false,
        can_edit_all_leads: false,
        can_delete_own_leads: false,
        can_delete_all_leads: false,
        can_import_leads: false,
        can_export_leads: false,
        can_bulk_edit_leads: false,
        can_assign_leads: false,
        can_reassign_leads: false,
        can_convert_leads: false,
        can_mark_lead_lost: false,
        can_add_lead_notes: false,
        can_edit_lead_notes: false,
        can_delete_lead_notes: false,
        can_view_whatsapp: false,
        can_view_all_chats: false,
        can_view_assigned_chats: false,
        can_view_chat_history: false,
        can_send_messages: false,
        can_send_media: false,
        can_use_quick_replies: false,
        can_create_quick_replies: false,
        can_manage_quick_replies: false,
        can_assign_chats: false,
        can_transfer_chats: false,
        can_manage_tags: false,
        can_add_chat_notes: false,
        can_access_crm: false,
        can_view_crm_calendar: false,
        can_edit_crm_calendar: false,
        can_manage_crm_pipeline: false,
        can_access_database: false,
        can_view_all_database: false,
        can_export_database: false,
        can_import_database: false,
        can_bulk_delete_database: false,
        can_access_contracts: false,
        can_view_contracts: false,
        can_create_contracts: false,
        can_edit_own_contracts: false,
        can_edit_all_contracts: false,
        can_delete_contracts: false,
        can_approve_contracts: false,
        can_generate_contract_pdf: false,
        can_access_orders: false,
        can_view_orders: false,
        can_create_orders: false,
        can_edit_own_orders: false,
        can_edit_all_orders: false,
        can_delete_orders: false,
        can_approve_orders: false,
        can_generate_order_pdf: false,
        can_access_catalog: false,
        can_view_products: false,
        can_create_products: false,
        can_edit_products: false,
        can_delete_products: false,
        can_manage_categories: false,
        can_manage_pricing: false,
        can_access_users: false,
        can_view_users: false,
        can_view_user_details: false,
        can_create_users: false,
        can_edit_users: false,
        can_delete_users: false,
        can_manage_roles: false,
        can_create_invites: false,
        can_view_user_activity: false,
        can_access_settings: false,
        can_edit_company_settings: false,
        can_manage_integrations: false,
        can_manage_whatsapp_config: false,
        can_manage_email_config: false,
        can_manage_payment_config: false,
        can_view_reports: false,
        can_view_analytics: false,
        can_export_reports: false,
        can_view_sales_reports: false,
        can_view_team_performance: false,
        can_view_financial_reports: false,
        can_view_audit_logs: false,
        can_manage_system: false,
        can_manage_backups: false,
        can_view_system_logs: false,
        can_manage_api_keys: false,
      })
    }
  }, [open, copyFromRole])

  // Marca/desmarca todas as permissões
  const setAllPermissions = (value: boolean) => {
    setPermissions((prev) => {
      const updated: RolePermissions = { ...prev }
      Object.keys(updated).forEach((key) => {
        updated[key as keyof RolePermissions] = value
      })
      return updated
    })
  }

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

      // Create new role with permissions in a single insert
      const cargoData = {
        nome: formData.nome,
        cor: formData.cor,
        descricao: formData.descricao,
        created_by_id: user?.id,
        created_by_nome: user?.nome,
        ...permissions,
      }
      
      console.log("[v0] Inserting cargo with permissions:", cargoData)
      
      const { error: roleError } = await supabase.from("cargos").insert([cargoData])

      if (roleError) {
        console.error("[v0] Error creating role:", roleError)
        console.error("[v0] Error details:", JSON.stringify(roleError, null, 2))
        toast.error("Erro ao criar cargo")
        setLoading(false)
        return
      }

      toast.success("Cargo criado com sucesso!")
      onSuccess()
      onOpenChange(false)
      setFormData({ nome: "", cor: "#3b82f6", descricao: "" })
      setPermissions({
        // Leads - Visualização
        can_view_leads: false,
        can_view_own_leads: false,
        can_view_all_leads: false,
        can_view_lead_details: false,
        can_view_lead_history: false,
        
        // Leads - Criação e Edição
        can_create_leads: false,
        can_edit_own_leads: false,
        can_edit_all_leads: false,
        can_delete_own_leads: false,
        can_delete_all_leads: false,
        can_import_leads: false,
        can_export_leads: false,
        can_bulk_edit_leads: false,
        
        // Leads - Ações
        can_assign_leads: false,
        can_reassign_leads: false,
        can_convert_leads: false,
        can_mark_lead_lost: false,
        can_add_lead_notes: false,
        can_edit_lead_notes: false,
        can_delete_lead_notes: false,
        
        // WhatsApp - Visualização
        can_view_whatsapp: false,
        can_view_all_chats: false,
        can_view_assigned_chats: false,
        can_view_chat_history: false,
        
        // WhatsApp - Ações
        can_send_messages: false,
        can_send_media: false,
        can_use_quick_replies: false,
        can_create_quick_replies: false,
        can_manage_quick_replies: false,
        can_assign_chats: false,
        can_transfer_chats: false,
        can_manage_tags: false,
        can_add_chat_notes: false,
        
        // CRM - Acesso
        can_access_crm: false,
        can_view_crm_calendar: false,
        can_edit_crm_calendar: false,
        can_manage_crm_pipeline: false,
        
        // Banco de Dados
        can_access_database: false,
        can_view_all_database: false,
        can_export_database: false,
        can_import_database: false,
        can_bulk_delete_database: false,
        
        // Contratos
        can_access_contracts: false,
        can_view_contracts: false,
        can_create_contracts: false,
        can_edit_own_contracts: false,
        can_edit_all_contracts: false,
        can_delete_contracts: false,
        can_approve_contracts: false,
        can_generate_contract_pdf: false,
        
        // Ordens de Serviço
        can_access_orders: false,
        can_view_orders: false,
        can_create_orders: false,
        can_edit_own_orders: false,
        can_edit_all_orders: false,
        can_delete_orders: false,
        can_approve_orders: false,
        can_generate_order_pdf: false,
        
        // Catálogo
        can_access_catalog: false,
        can_view_products: false,
        can_create_products: false,
        can_edit_products: false,
        can_delete_products: false,
        can_manage_categories: false,
        can_manage_pricing: false,
        
        // Usuários
        can_access_users: false,
        can_view_users: false,
        can_view_user_details: false,
        can_create_users: false,
        can_edit_users: false,
        can_delete_users: false,
        can_manage_roles: false,
        can_create_invites: false,
        can_view_user_activity: false,
        
        // Configurações
        can_access_settings: false,
        can_edit_company_settings: false,
        can_manage_integrations: false,
        can_manage_whatsapp_config: false,
        can_manage_email_config: false,
        can_manage_payment_config: false,
        
        // Relatórios e Analytics
        can_view_reports: false,
        can_view_analytics: false,
        can_export_reports: false,
        can_view_sales_reports: false,
        can_view_team_performance: false,
        can_view_financial_reports: false,
        
        // Sistema
        can_view_audit_logs: false,
        can_manage_system: false,
        can_manage_backups: false,
        can_view_system_logs: false,
        can_manage_api_keys: false,
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

            <div className="space-y-4">
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
                <Label>Cor do cargo</Label>
                <ColorPalette
                  value={formData.cor}
                  onChange={(cor) => setFormData({ ...formData, cor })}
                />
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
              <h4 className="text-xs font-medium text-neutral-600 uppercase">Leads - Visualização</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_leads" checked={permissions.can_view_leads} onCheckedChange={(c) => updatePermission("can_view_leads", c as boolean)} />
                  <Label htmlFor="can_view_leads" className="text-sm font-normal cursor-pointer">Visualizar leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_own_leads" checked={permissions.can_view_own_leads} onCheckedChange={(c) => updatePermission("can_view_own_leads", c as boolean)} />
                  <Label htmlFor="can_view_own_leads" className="text-sm font-normal cursor-pointer">Ver próprios leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_all_leads" checked={permissions.can_view_all_leads} onCheckedChange={(c) => updatePermission("can_view_all_leads", c as boolean)} />
                  <Label htmlFor="can_view_all_leads" className="text-sm font-normal cursor-pointer">Ver todos os leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_lead_details" checked={permissions.can_view_lead_details} onCheckedChange={(c) => updatePermission("can_view_lead_details", c as boolean)} />
                  <Label htmlFor="can_view_lead_details" className="text-sm font-normal cursor-pointer">Ver detalhes do lead</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_lead_history" checked={permissions.can_view_lead_history} onCheckedChange={(c) => updatePermission("can_view_lead_history", c as boolean)} />
                  <Label htmlFor="can_view_lead_history" className="text-sm font-normal cursor-pointer">Ver histórico do lead</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600 uppercase">Leads - Criação e Edição</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_create_leads" checked={permissions.can_create_leads} onCheckedChange={(c) => updatePermission("can_create_leads", c as boolean)} />
                  <Label htmlFor="can_create_leads" className="text-sm font-normal cursor-pointer">Criar leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_edit_own_leads" checked={permissions.can_edit_own_leads} onCheckedChange={(c) => updatePermission("can_edit_own_leads", c as boolean)} />
                  <Label htmlFor="can_edit_own_leads" className="text-sm font-normal cursor-pointer">Editar próprios leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_edit_all_leads" checked={permissions.can_edit_all_leads} onCheckedChange={(c) => updatePermission("can_edit_all_leads", c as boolean)} />
                  <Label htmlFor="can_edit_all_leads" className="text-sm font-normal cursor-pointer">Editar todos os leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_delete_own_leads" checked={permissions.can_delete_own_leads} onCheckedChange={(c) => updatePermission("can_delete_own_leads", c as boolean)} />
                  <Label htmlFor="can_delete_own_leads" className="text-sm font-normal cursor-pointer">Deletar próprios leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_delete_all_leads" checked={permissions.can_delete_all_leads} onCheckedChange={(c) => updatePermission("can_delete_all_leads", c as boolean)} />
                  <Label htmlFor="can_delete_all_leads" className="text-sm font-normal cursor-pointer">Deletar todos os leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_import_leads" checked={permissions.can_import_leads} onCheckedChange={(c) => updatePermission("can_import_leads", c as boolean)} />
                  <Label htmlFor="can_import_leads" className="text-sm font-normal cursor-pointer">Importar leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_export_leads" checked={permissions.can_export_leads} onCheckedChange={(c) => updatePermission("can_export_leads", c as boolean)} />
                  <Label htmlFor="can_export_leads" className="text-sm font-normal cursor-pointer">Exportar leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_bulk_edit_leads" checked={permissions.can_bulk_edit_leads} onCheckedChange={(c) => updatePermission("can_bulk_edit_leads", c as boolean)} />
                  <Label htmlFor="can_bulk_edit_leads" className="text-sm font-normal cursor-pointer">Edição em massa</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600 uppercase">Leads - Ações</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_assign_leads" checked={permissions.can_assign_leads} onCheckedChange={(c) => updatePermission("can_assign_leads", c as boolean)} />
                  <Label htmlFor="can_assign_leads" className="text-sm font-normal cursor-pointer">Atribuir leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_reassign_leads" checked={permissions.can_reassign_leads} onCheckedChange={(c) => updatePermission("can_reassign_leads", c as boolean)} />
                  <Label htmlFor="can_reassign_leads" className="text-sm font-normal cursor-pointer">Reatribuir leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_convert_leads" checked={permissions.can_convert_leads} onCheckedChange={(c) => updatePermission("can_convert_leads", c as boolean)} />
                  <Label htmlFor="can_convert_leads" className="text-sm font-normal cursor-pointer">Converter leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_mark_lead_lost" checked={permissions.can_mark_lead_lost} onCheckedChange={(c) => updatePermission("can_mark_lead_lost", c as boolean)} />
                  <Label htmlFor="can_mark_lead_lost" className="text-sm font-normal cursor-pointer">Marcar lead perdido</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_add_lead_notes" checked={permissions.can_add_lead_notes} onCheckedChange={(c) => updatePermission("can_add_lead_notes", c as boolean)} />
                  <Label htmlFor="can_add_lead_notes" className="text-sm font-normal cursor-pointer">Adicionar notas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_edit_lead_notes" checked={permissions.can_edit_lead_notes} onCheckedChange={(c) => updatePermission("can_edit_lead_notes", c as boolean)} />
                  <Label htmlFor="can_edit_lead_notes" className="text-sm font-normal cursor-pointer">Editar notas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_delete_lead_notes" checked={permissions.can_delete_lead_notes} onCheckedChange={(c) => updatePermission("can_delete_lead_notes", c as boolean)} />
                  <Label htmlFor="can_delete_lead_notes" className="text-sm font-normal cursor-pointer">Deletar notas</Label>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600 uppercase">WhatsApp - Visualização</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_whatsapp" checked={permissions.can_view_whatsapp} onCheckedChange={(c) => updatePermission("can_view_whatsapp", c as boolean)} />
                  <Label htmlFor="can_view_whatsapp" className="text-sm font-normal cursor-pointer">Acessar WhatsApp</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_all_chats" checked={permissions.can_view_all_chats} onCheckedChange={(c) => updatePermission("can_view_all_chats", c as boolean)} />
                  <Label htmlFor="can_view_all_chats" className="text-sm font-normal cursor-pointer">Ver todos os chats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_assigned_chats" checked={permissions.can_view_assigned_chats} onCheckedChange={(c) => updatePermission("can_view_assigned_chats", c as boolean)} />
                  <Label htmlFor="can_view_assigned_chats" className="text-sm font-normal cursor-pointer">Ver chats atribuídos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_view_chat_history" checked={permissions.can_view_chat_history} onCheckedChange={(c) => updatePermission("can_view_chat_history", c as boolean)} />
                  <Label htmlFor="can_view_chat_history" className="text-sm font-normal cursor-pointer">Ver histórico de chat</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-medium text-neutral-600 uppercase">WhatsApp - Ações</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_send_messages" checked={permissions.can_send_messages} onCheckedChange={(c) => updatePermission("can_send_messages", c as boolean)} />
                  <Label htmlFor="can_send_messages" className="text-sm font-normal cursor-pointer">Enviar mensagens</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_send_media" checked={permissions.can_send_media} onCheckedChange={(c) => updatePermission("can_send_media", c as boolean)} />
                  <Label htmlFor="can_send_media" className="text-sm font-normal cursor-pointer">Enviar mídia</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_use_quick_replies" checked={permissions.can_use_quick_replies} onCheckedChange={(c) => updatePermission("can_use_quick_replies", c as boolean)} />
                  <Label htmlFor="can_use_quick_replies" className="text-sm font-normal cursor-pointer">Usar respostas rápidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_create_quick_replies" checked={permissions.can_create_quick_replies} onCheckedChange={(c) => updatePermission("can_create_quick_replies", c as boolean)} />
                  <Label htmlFor="can_create_quick_replies" className="text-sm font-normal cursor-pointer">Criar respostas rápidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_manage_quick_replies" checked={permissions.can_manage_quick_replies} onCheckedChange={(c) => updatePermission("can_manage_quick_replies", c as boolean)} />
                  <Label htmlFor="can_manage_quick_replies" className="text-sm font-normal cursor-pointer">Gerenciar respostas rápidas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_assign_chats" checked={permissions.can_assign_chats} onCheckedChange={(c) => updatePermission("can_assign_chats", c as boolean)} />
                  <Label htmlFor="can_assign_chats" className="text-sm font-normal cursor-pointer">Atribuir chats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_transfer_chats" checked={permissions.can_transfer_chats} onCheckedChange={(c) => updatePermission("can_transfer_chats", c as boolean)} />
                  <Label htmlFor="can_transfer_chats" className="text-sm font-normal cursor-pointer">Transferir chats</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_manage_tags" checked={permissions.can_manage_tags} onCheckedChange={(c) => updatePermission("can_manage_tags", c as boolean)} />
                  <Label htmlFor="can_manage_tags" className="text-sm font-normal cursor-pointer">Gerenciar etiquetas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="can_add_chat_notes" checked={permissions.can_add_chat_notes} onCheckedChange={(c) => updatePermission("can_add_chat_notes", c as boolean)} />
                  <Label htmlFor="can_add_chat_notes" className="text-sm font-normal cursor-pointer">Adicionar notas no chat</Label>
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

            <Separator />

            {/* Checkbox Tudo - Permissão Total */}
            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Checkbox
                id="all_permissions"
                checked={Object.values(permissions).every(Boolean)}
                indeterminate={Object.values(permissions).some(Boolean) && !Object.values(permissions).every(Boolean) ? true : undefined}
                onCheckedChange={(c) => setAllPermissions(!!c)}
              />
              <Label htmlFor="all_permissions" className="text-sm font-bold cursor-pointer text-blue-700">
                Tudo (Permissão total)
              </Label>
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
