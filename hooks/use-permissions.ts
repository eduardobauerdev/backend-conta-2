'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/user-context'
import { createClient } from '@/lib/supabase/client'

export interface UserPermissions {
  // Leads
  can_view_leads: boolean
  can_view_own_leads: boolean
  can_view_all_leads: boolean
  can_view_lead_details: boolean
  can_view_lead_history: boolean
  can_create_leads: boolean
  can_edit_own_leads: boolean
  can_edit_all_leads: boolean
  can_delete_own_leads: boolean
  can_delete_all_leads: boolean
  can_import_leads: boolean
  can_export_leads: boolean
  can_bulk_edit_leads: boolean
  can_assign_leads: boolean
  can_reassign_leads: boolean
  can_convert_leads: boolean
  can_mark_lead_lost: boolean
  can_add_lead_notes: boolean
  can_edit_lead_notes: boolean
  can_delete_lead_notes: boolean
  
  // WhatsApp
  can_view_whatsapp: boolean
  can_view_all_chats: boolean
  can_view_assigned_chats: boolean
  can_view_chat_history: boolean
  can_send_messages: boolean
  can_send_media: boolean
  can_use_quick_replies: boolean
  can_create_quick_replies: boolean
  can_manage_quick_replies: boolean
  can_assign_chats: boolean
  can_transfer_chats: boolean
  can_manage_tags: boolean
  can_add_chat_notes: boolean
  
  // CRM
  can_access_crm: boolean
  can_view_crm_calendar: boolean
  can_edit_crm_calendar: boolean
  can_manage_crm_pipeline: boolean
  
  // Database
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
  
  // Pedidos
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
  
  // Relatórios
  can_view_reports: boolean
  can_view_analytics: boolean
  can_export_reports: boolean
  can_view_sales_reports: boolean
  can_view_team_performance: boolean
  can_view_financial_reports: boolean
  can_view_audit_logs: boolean
  
  // Sistema
  can_manage_system: boolean
  can_manage_backups: boolean
  can_view_system_logs: boolean
  can_manage_api_keys: boolean
}

const defaultPermissions: UserPermissions = {
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
}

export function usePermissions() {
  const { user } = useUser()
  const [permissions, setPermissions] = useState<UserPermissions>(defaultPermissions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPermissions = async () => {
      if (!user?.cargo) {
        setPermissions(defaultPermissions)
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('cargos')
          .select('*')
          .eq('nome', user.cargo)
          .single()

        if (error) {
          console.error('Erro ao carregar permissões:', error)
          setPermissions(defaultPermissions)
        } else if (data) {
          // Mapear as permissões do banco para o tipo UserPermissions
          const userPermissions: UserPermissions = {
            can_view_leads: data.can_view_leads || false,
            can_view_own_leads: data.can_view_own_leads || false,
            can_view_all_leads: data.can_view_all_leads || false,
            can_view_lead_details: data.can_view_lead_details || false,
            can_view_lead_history: data.can_view_lead_history || false,
            can_create_leads: data.can_create_leads || false,
            can_edit_own_leads: data.can_edit_own_leads || false,
            can_edit_all_leads: data.can_edit_all_leads || false,
            can_delete_own_leads: data.can_delete_own_leads || false,
            can_delete_all_leads: data.can_delete_all_leads || false,
            can_import_leads: data.can_import_leads || false,
            can_export_leads: data.can_export_leads || false,
            can_bulk_edit_leads: data.can_bulk_edit_leads || false,
            can_assign_leads: data.can_assign_leads || false,
            can_reassign_leads: data.can_reassign_leads || false,
            can_convert_leads: data.can_convert_leads || false,
            can_mark_lead_lost: data.can_mark_lead_lost || false,
            can_add_lead_notes: data.can_add_lead_notes || false,
            can_edit_lead_notes: data.can_edit_lead_notes || false,
            can_delete_lead_notes: data.can_delete_lead_notes || false,
            can_view_whatsapp: data.can_view_whatsapp || false,
            can_view_all_chats: data.can_view_all_chats || false,
            can_view_assigned_chats: data.can_view_assigned_chats || false,
            can_view_chat_history: data.can_view_chat_history || false,
            can_send_messages: data.can_send_messages || false,
            can_send_media: data.can_send_media || false,
            can_use_quick_replies: data.can_use_quick_replies || false,
            can_create_quick_replies: data.can_create_quick_replies || false,
            can_manage_quick_replies: data.can_manage_quick_replies || false,
            can_assign_chats: data.can_assign_chats || false,
            can_transfer_chats: data.can_transfer_chats || false,
            can_manage_tags: data.can_manage_tags || false,
            can_add_chat_notes: data.can_add_chat_notes || false,
            can_access_crm: data.can_access_crm || false,
            can_view_crm_calendar: data.can_view_crm_calendar || false,
            can_edit_crm_calendar: data.can_edit_crm_calendar || false,
            can_manage_crm_pipeline: data.can_manage_crm_pipeline || false,
            can_access_database: data.can_access_database || false,
            can_view_all_database: data.can_view_all_database || false,
            can_export_database: data.can_export_database || false,
            can_import_database: data.can_import_database || false,
            can_bulk_delete_database: data.can_bulk_delete_database || false,
            can_access_contracts: data.can_access_contracts || false,
            can_view_contracts: data.can_view_contracts || false,
            can_create_contracts: data.can_create_contracts || false,
            can_edit_own_contracts: data.can_edit_own_contracts || false,
            can_edit_all_contracts: data.can_edit_all_contracts || false,
            can_delete_contracts: data.can_delete_contracts || false,
            can_approve_contracts: data.can_approve_contracts || false,
            can_generate_contract_pdf: data.can_generate_contract_pdf || false,
            can_access_orders: data.can_access_orders || false,
            can_view_orders: data.can_view_orders || false,
            can_create_orders: data.can_create_orders || false,
            can_edit_own_orders: data.can_edit_own_orders || false,
            can_edit_all_orders: data.can_edit_all_orders || false,
            can_delete_orders: data.can_delete_orders || false,
            can_approve_orders: data.can_approve_orders || false,
            can_generate_order_pdf: data.can_generate_order_pdf || false,
            can_access_catalog: data.can_access_catalog || false,
            can_view_products: data.can_view_products || false,
            can_create_products: data.can_create_products || false,
            can_edit_products: data.can_edit_products || false,
            can_delete_products: data.can_delete_products || false,
            can_manage_categories: data.can_manage_categories || false,
            can_manage_pricing: data.can_manage_pricing || false,
            can_access_users: data.can_access_users || false,
            can_view_users: data.can_view_users || false,
            can_view_user_details: data.can_view_user_details || false,
            can_create_users: data.can_create_users || false,
            can_edit_users: data.can_edit_users || false,
            can_delete_users: data.can_delete_users || false,
            can_manage_roles: data.can_manage_roles || false,
            can_create_invites: data.can_create_invites || false,
            can_view_user_activity: data.can_view_user_activity || false,
            can_access_settings: data.can_access_settings || false,
            can_edit_company_settings: data.can_edit_company_settings || false,
            can_manage_integrations: data.can_manage_integrations || false,
            can_manage_whatsapp_config: data.can_manage_whatsapp_config || false,
            can_manage_email_config: data.can_manage_email_config || false,
            can_manage_payment_config: data.can_manage_payment_config || false,
            can_view_reports: data.can_view_reports || false,
            can_view_analytics: data.can_view_analytics || false,
            can_export_reports: data.can_export_reports || false,
            can_view_sales_reports: data.can_view_sales_reports || false,
            can_view_team_performance: data.can_view_team_performance || false,
            can_view_financial_reports: data.can_view_financial_reports || false,
            can_view_audit_logs: data.can_view_audit_logs || false,
            can_manage_system: data.can_manage_system || false,
            can_manage_backups: data.can_manage_backups || false,
            can_view_system_logs: data.can_view_system_logs || false,
            can_manage_api_keys: data.can_manage_api_keys || false,
          }
          setPermissions(userPermissions)
        }
      } catch (error) {
        console.error('Erro ao carregar permissões:', error)
        setPermissions(defaultPermissions)
      } finally {
        setLoading(false)
      }
    }

    loadPermissions()
  }, [user?.cargo])

  return { permissions, loading }
}