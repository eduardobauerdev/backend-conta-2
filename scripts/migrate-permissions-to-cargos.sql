-- =====================================================
-- MIGRAÇÃO: UNIFICAR cargo_permissions EM cargos
-- Execute este SQL no Supabase SQL Editor
-- =====================================================

-- 1. Adicionar todas as colunas de permissões à tabela cargos
ALTER TABLE cargos
  -- ==================== LEADS - VISUALIZAÇÃO ====================
  ADD COLUMN IF NOT EXISTS can_view_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_own_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_all_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_lead_details BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_lead_history BOOLEAN DEFAULT false,
  
  -- ==================== LEADS - CRIAÇÃO E EDIÇÃO ====================
  ADD COLUMN IF NOT EXISTS can_create_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_own_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_all_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_own_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_all_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_import_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_export_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_bulk_edit_leads BOOLEAN DEFAULT false,
  
  -- ==================== LEADS - AÇÕES ====================
  ADD COLUMN IF NOT EXISTS can_assign_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_reassign_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_convert_leads BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_mark_lead_lost BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_add_lead_notes BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_lead_notes BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_lead_notes BOOLEAN DEFAULT false,
  
  -- ==================== WHATSAPP - VISUALIZAÇÃO ====================
  ADD COLUMN IF NOT EXISTS can_view_whatsapp BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_all_chats BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_assigned_chats BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_chat_history BOOLEAN DEFAULT false,
  
  -- ==================== WHATSAPP - AÇÕES ====================
  ADD COLUMN IF NOT EXISTS can_send_messages BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_send_media BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_use_quick_replies BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_create_quick_replies BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_quick_replies BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_assign_chats BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_transfer_chats BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_tags BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_add_chat_notes BOOLEAN DEFAULT false,
  
  -- ==================== CRM - ACESSO ====================
  ADD COLUMN IF NOT EXISTS can_access_crm BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_crm_calendar BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_crm_calendar BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_crm_pipeline BOOLEAN DEFAULT false,
  
  -- ==================== BANCO DE DADOS ====================
  ADD COLUMN IF NOT EXISTS can_access_database BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_all_database BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_export_database BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_import_database BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_bulk_delete_database BOOLEAN DEFAULT false,
  
  -- ==================== CONTRATOS ====================
  ADD COLUMN IF NOT EXISTS can_access_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_create_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_own_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_all_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_approve_contracts BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_generate_contract_pdf BOOLEAN DEFAULT false,
  
  -- ==================== ORDENS DE SERVIÇO ====================
  ADD COLUMN IF NOT EXISTS can_access_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_create_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_own_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_all_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_approve_orders BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_generate_order_pdf BOOLEAN DEFAULT false,
  
  -- ==================== CATÁLOGO ====================
  ADD COLUMN IF NOT EXISTS can_access_catalog BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_products BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_create_products BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_products BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_products BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_categories BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_pricing BOOLEAN DEFAULT false,
  
  -- ==================== USUÁRIOS ====================
  ADD COLUMN IF NOT EXISTS can_access_users BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_users BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_user_details BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_create_users BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_users BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_delete_users BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_roles BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_create_invites BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_user_activity BOOLEAN DEFAULT false,
  
  -- ==================== CONFIGURAÇÕES ====================
  ADD COLUMN IF NOT EXISTS can_access_settings BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_edit_company_settings BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_integrations BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_whatsapp_config BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_email_config BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_payment_config BOOLEAN DEFAULT false,
  
  -- ==================== RELATÓRIOS E ANALYTICS ====================
  ADD COLUMN IF NOT EXISTS can_view_reports BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_analytics BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_export_reports BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_sales_reports BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_team_performance BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_financial_reports BOOLEAN DEFAULT false,
  
  -- ==================== SISTEMA ====================
  ADD COLUMN IF NOT EXISTS can_view_audit_logs BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_system BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_backups BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_view_system_logs BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS can_manage_api_keys BOOLEAN DEFAULT false;

-- 2. Migrar dados existentes de cargo_permissions para cargos (se a tabela existir)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cargo_permissions') THEN
    UPDATE cargos c
    SET 
      -- Leads - Visualização
      can_view_leads = COALESCE(cp.can_view_leads, false),
      can_view_own_leads = COALESCE(cp.can_view_own_leads, false),
      can_view_all_leads = COALESCE(cp.can_view_all_leads, false),
      can_view_lead_details = COALESCE(cp.can_view_lead_details, false),
      can_view_lead_history = COALESCE(cp.can_view_lead_history, false),
      
      -- Leads - Criação e Edição
      can_create_leads = COALESCE(cp.can_create_leads, false),
      can_edit_own_leads = COALESCE(cp.can_edit_own_leads, false),
      can_edit_all_leads = COALESCE(cp.can_edit_all_leads, false),
      can_delete_own_leads = COALESCE(cp.can_delete_own_leads, false),
      can_delete_all_leads = COALESCE(cp.can_delete_all_leads, false),
      can_import_leads = COALESCE(cp.can_import_leads, false),
      can_export_leads = COALESCE(cp.can_export_leads, false),
      can_bulk_edit_leads = COALESCE(cp.can_bulk_edit_leads, false),
      
      -- Leads - Ações
      can_assign_leads = COALESCE(cp.can_assign_leads, false),
      can_reassign_leads = COALESCE(cp.can_reassign_leads, false),
      can_convert_leads = COALESCE(cp.can_convert_leads, false),
      can_mark_lead_lost = COALESCE(cp.can_mark_lead_lost, false),
      can_add_lead_notes = COALESCE(cp.can_add_lead_notes, false),
      can_edit_lead_notes = COALESCE(cp.can_edit_lead_notes, false),
      can_delete_lead_notes = COALESCE(cp.can_delete_lead_notes, false),
      
      -- WhatsApp - Visualização
      can_view_whatsapp = COALESCE(cp.can_view_whatsapp, false),
      can_view_all_chats = COALESCE(cp.can_view_all_chats, false),
      can_view_assigned_chats = COALESCE(cp.can_view_assigned_chats, false),
      can_view_chat_history = COALESCE(cp.can_view_chat_history, false),
      
      -- WhatsApp - Ações
      can_send_messages = COALESCE(cp.can_send_messages, false),
      can_send_media = COALESCE(cp.can_send_media, false),
      can_use_quick_replies = COALESCE(cp.can_use_quick_replies, false),
      can_create_quick_replies = COALESCE(cp.can_create_quick_replies, false),
      can_manage_quick_replies = COALESCE(cp.can_manage_quick_replies, false),
      can_assign_chats = COALESCE(cp.can_assign_chats, false),
      can_transfer_chats = COALESCE(cp.can_transfer_chats, false),
      can_manage_tags = COALESCE(cp.can_manage_tags, false),
      can_add_chat_notes = COALESCE(cp.can_add_chat_notes, false),
      
      -- CRM - Acesso
      can_access_crm = COALESCE(cp.can_access_crm, false),
      can_view_crm_calendar = COALESCE(cp.can_view_crm_calendar, false),
      can_edit_crm_calendar = COALESCE(cp.can_edit_crm_calendar, false),
      can_manage_crm_pipeline = COALESCE(cp.can_manage_crm_pipeline, false),
      
      -- Banco de Dados
      can_access_database = COALESCE(cp.can_access_database, false),
      can_view_all_database = COALESCE(cp.can_view_all_database, false),
      can_export_database = COALESCE(cp.can_export_database, false),
      can_import_database = COALESCE(cp.can_import_database, false),
      can_bulk_delete_database = COALESCE(cp.can_bulk_delete_database, false),
      
      -- Contratos
      can_access_contracts = COALESCE(cp.can_access_contracts, false),
      can_view_contracts = COALESCE(cp.can_view_contracts, false),
      can_create_contracts = COALESCE(cp.can_create_contracts, false),
      can_edit_own_contracts = COALESCE(cp.can_edit_own_contracts, false),
      can_edit_all_contracts = COALESCE(cp.can_edit_all_contracts, false),
      can_delete_contracts = COALESCE(cp.can_delete_contracts, false),
      can_approve_contracts = COALESCE(cp.can_approve_contracts, false),
      can_generate_contract_pdf = COALESCE(cp.can_generate_contract_pdf, false),
      
      -- Ordens de Serviço
      can_access_orders = COALESCE(cp.can_access_orders, false),
      can_view_orders = COALESCE(cp.can_view_orders, false),
      can_create_orders = COALESCE(cp.can_create_orders, false),
      can_edit_own_orders = COALESCE(cp.can_edit_own_orders, false),
      can_edit_all_orders = COALESCE(cp.can_edit_all_orders, false),
      can_delete_orders = COALESCE(cp.can_delete_orders, false),
      can_approve_orders = COALESCE(cp.can_approve_orders, false),
      can_generate_order_pdf = COALESCE(cp.can_generate_order_pdf, false),
      
      -- Catálogo
      can_access_catalog = COALESCE(cp.can_access_catalog, false),
      can_view_products = COALESCE(cp.can_view_products, false),
      can_create_products = COALESCE(cp.can_create_products, false),
      can_edit_products = COALESCE(cp.can_edit_products, false),
      can_delete_products = COALESCE(cp.can_delete_products, false),
      can_manage_categories = COALESCE(cp.can_manage_categories, false),
      can_manage_pricing = COALESCE(cp.can_manage_pricing, false),
      
      -- Usuários
      can_access_users = COALESCE(cp.can_access_users, false),
      can_view_users = COALESCE(cp.can_view_users, false),
      can_view_user_details = COALESCE(cp.can_view_user_details, false),
      can_create_users = COALESCE(cp.can_create_users, false),
      can_edit_users = COALESCE(cp.can_edit_users, false),
      can_delete_users = COALESCE(cp.can_delete_users, false),
      can_manage_roles = COALESCE(cp.can_manage_roles, false),
      can_create_invites = COALESCE(cp.can_create_invites, false),
      can_view_user_activity = COALESCE(cp.can_view_user_activity, false),
      
      -- Configurações
      can_access_settings = COALESCE(cp.can_access_settings, false),
      can_edit_company_settings = COALESCE(cp.can_edit_company_settings, false),
      can_manage_integrations = COALESCE(cp.can_manage_integrations, false),
      can_manage_whatsapp_config = COALESCE(cp.can_manage_whatsapp_config, false),
      can_manage_email_config = COALESCE(cp.can_manage_email_config, false),
      can_manage_payment_config = COALESCE(cp.can_manage_payment_config, false),
      
      -- Relatórios e Analytics
      can_view_reports = COALESCE(cp.can_view_reports, false),
      can_view_analytics = COALESCE(cp.can_view_analytics, false),
      can_export_reports = COALESCE(cp.can_export_reports, false),
      can_view_sales_reports = COALESCE(cp.can_view_sales_reports, false),
      can_view_team_performance = COALESCE(cp.can_view_team_performance, false),
      can_view_financial_reports = COALESCE(cp.can_view_financial_reports, false),
      
      -- Sistema
      can_view_audit_logs = COALESCE(cp.can_view_audit_logs, false),
      can_manage_system = COALESCE(cp.can_manage_system, false),
      can_manage_backups = COALESCE(cp.can_manage_backups, false),
      can_view_system_logs = COALESCE(cp.can_view_system_logs, false),
      can_manage_api_keys = COALESCE(cp.can_manage_api_keys, false)
    FROM cargo_permissions cp
    WHERE c.nome = cp.cargo_nome;
  END IF;
END $$;

-- 3. Dropar a tabela cargo_permissions (CUIDADO: isso apaga a tabela antiga)
DROP TABLE IF EXISTS cargo_permissions CASCADE;

-- 4. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_cargos_nome ON cargos(nome);

-- 5. Adicionar comentários
COMMENT ON TABLE cargos IS 'Tabela de cargos com permissões granulares integradas';

-- 6. Verificar dados migrados
SELECT 
  nome,
  cor,
  can_view_leads,
  can_create_leads,
  can_access_crm,
  can_access_database,
  can_manage_system
FROM cargos
ORDER BY nome;
