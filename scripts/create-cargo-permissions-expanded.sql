-- =====================================================
-- TABELA DE PERMISSÕES DE CARGOS EXPANDIDA
-- Execute este SQL no Supabase SQL Editor
-- =====================================================

-- 1. DROP da tabela antiga se existir (CUIDADO: isso apaga os dados)
DROP TABLE IF EXISTS cargo_permissions CASCADE;

-- 2. Criar nova tabela cargo_permissions com todas as permissões
CREATE TABLE cargo_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cargo_nome VARCHAR NOT NULL UNIQUE REFERENCES cargos(nome) ON DELETE CASCADE ON UPDATE CASCADE,
  
  -- ==================== LEADS - VISUALIZAÇÃO ====================
  can_view_leads BOOLEAN DEFAULT false,
  can_view_own_leads BOOLEAN DEFAULT false,
  can_view_all_leads BOOLEAN DEFAULT false,
  can_view_lead_details BOOLEAN DEFAULT false,
  can_view_lead_history BOOLEAN DEFAULT false,
  
  -- ==================== LEADS - CRIAÇÃO E EDIÇÃO ====================
  can_create_leads BOOLEAN DEFAULT false,
  can_edit_own_leads BOOLEAN DEFAULT false,
  can_edit_all_leads BOOLEAN DEFAULT false,
  can_delete_own_leads BOOLEAN DEFAULT false,
  can_delete_all_leads BOOLEAN DEFAULT false,
  can_import_leads BOOLEAN DEFAULT false,
  can_export_leads BOOLEAN DEFAULT false,
  can_bulk_edit_leads BOOLEAN DEFAULT false,
  
  -- ==================== LEADS - AÇÕES ====================
  can_assign_leads BOOLEAN DEFAULT false,
  can_reassign_leads BOOLEAN DEFAULT false,
  can_convert_leads BOOLEAN DEFAULT false,
  can_mark_lead_lost BOOLEAN DEFAULT false,
  can_add_lead_notes BOOLEAN DEFAULT false,
  can_edit_lead_notes BOOLEAN DEFAULT false,
  can_delete_lead_notes BOOLEAN DEFAULT false,
  
  -- ==================== WHATSAPP - VISUALIZAÇÃO ====================
  can_view_whatsapp BOOLEAN DEFAULT false,
  can_view_all_chats BOOLEAN DEFAULT false,
  can_view_assigned_chats BOOLEAN DEFAULT false,
  can_view_chat_history BOOLEAN DEFAULT false,
  
  -- ==================== WHATSAPP - AÇÕES ====================
  can_send_messages BOOLEAN DEFAULT false,
  can_send_media BOOLEAN DEFAULT false,
  can_use_quick_replies BOOLEAN DEFAULT false,
  can_create_quick_replies BOOLEAN DEFAULT false,
  can_manage_quick_replies BOOLEAN DEFAULT false,
  can_assign_chats BOOLEAN DEFAULT false,
  can_transfer_chats BOOLEAN DEFAULT false,
  can_manage_tags BOOLEAN DEFAULT false,
  can_add_chat_notes BOOLEAN DEFAULT false,
  
  -- ==================== CRM - ACESSO ====================
  can_access_crm BOOLEAN DEFAULT false,
  can_view_crm_calendar BOOLEAN DEFAULT false,
  can_edit_crm_calendar BOOLEAN DEFAULT false,
  can_manage_crm_pipeline BOOLEAN DEFAULT false,
  
  -- ==================== BANCO DE DADOS ====================
  can_access_database BOOLEAN DEFAULT false,
  can_view_all_database BOOLEAN DEFAULT false,
  can_export_database BOOLEAN DEFAULT false,
  can_import_database BOOLEAN DEFAULT false,
  can_bulk_delete_database BOOLEAN DEFAULT false,
  
  -- ==================== CONTRATOS ====================
  can_access_contracts BOOLEAN DEFAULT false,
  can_view_contracts BOOLEAN DEFAULT false,
  can_create_contracts BOOLEAN DEFAULT false,
  can_edit_own_contracts BOOLEAN DEFAULT false,
  can_edit_all_contracts BOOLEAN DEFAULT false,
  can_delete_contracts BOOLEAN DEFAULT false,
  can_approve_contracts BOOLEAN DEFAULT false,
  can_generate_contract_pdf BOOLEAN DEFAULT false,
  
  -- ==================== ORDENS DE SERVIÇO ====================
  can_access_orders BOOLEAN DEFAULT false,
  can_view_orders BOOLEAN DEFAULT false,
  can_create_orders BOOLEAN DEFAULT false,
  can_edit_own_orders BOOLEAN DEFAULT false,
  can_edit_all_orders BOOLEAN DEFAULT false,
  can_delete_orders BOOLEAN DEFAULT false,
  can_approve_orders BOOLEAN DEFAULT false,
  can_generate_order_pdf BOOLEAN DEFAULT false,
  
  -- ==================== CATÁLOGO ====================
  can_access_catalog BOOLEAN DEFAULT false,
  can_view_products BOOLEAN DEFAULT false,
  can_create_products BOOLEAN DEFAULT false,
  can_edit_products BOOLEAN DEFAULT false,
  can_delete_products BOOLEAN DEFAULT false,
  can_manage_categories BOOLEAN DEFAULT false,
  can_manage_pricing BOOLEAN DEFAULT false,
  
  -- ==================== USUÁRIOS ====================
  can_access_users BOOLEAN DEFAULT false,
  can_view_users BOOLEAN DEFAULT false,
  can_view_user_details BOOLEAN DEFAULT false,
  can_create_users BOOLEAN DEFAULT false,
  can_edit_users BOOLEAN DEFAULT false,
  can_delete_users BOOLEAN DEFAULT false,
  can_manage_roles BOOLEAN DEFAULT false,
  can_create_invites BOOLEAN DEFAULT false,
  can_view_user_activity BOOLEAN DEFAULT false,
  
  -- ==================== CONFIGURAÇÕES ====================
  can_access_settings BOOLEAN DEFAULT false,
  can_edit_company_settings BOOLEAN DEFAULT false,
  can_manage_integrations BOOLEAN DEFAULT false,
  can_manage_whatsapp_config BOOLEAN DEFAULT false,
  can_manage_email_config BOOLEAN DEFAULT false,
  can_manage_payment_config BOOLEAN DEFAULT false,
  
  -- ==================== RELATÓRIOS E ANALYTICS ====================
  can_view_reports BOOLEAN DEFAULT false,
  can_view_analytics BOOLEAN DEFAULT false,
  can_export_reports BOOLEAN DEFAULT false,
  can_view_sales_reports BOOLEAN DEFAULT false,
  can_view_team_performance BOOLEAN DEFAULT false,
  can_view_financial_reports BOOLEAN DEFAULT false,
  
  -- ==================== SISTEMA ====================
  can_view_audit_logs BOOLEAN DEFAULT false,
  can_manage_system BOOLEAN DEFAULT false,
  can_manage_backups BOOLEAN DEFAULT false,
  can_view_system_logs BOOLEAN DEFAULT false,
  can_manage_api_keys BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Desabilitar RLS para facilitar o uso com auth customizado
ALTER TABLE cargo_permissions DISABLE ROW LEVEL SECURITY;

-- 4. Inserir permissões padrão para cada cargo
INSERT INTO cargo_permissions (
  cargo_nome,
  -- Leads - Visualização
  can_view_leads, can_view_own_leads, can_view_all_leads, can_view_lead_details, can_view_lead_history,
  -- Leads - Criação e Edição
  can_create_leads, can_edit_own_leads, can_edit_all_leads, can_delete_own_leads, can_delete_all_leads,
  can_import_leads, can_export_leads, can_bulk_edit_leads,
  -- Leads - Ações
  can_assign_leads, can_reassign_leads, can_convert_leads, can_mark_lead_lost,
  can_add_lead_notes, can_edit_lead_notes, can_delete_lead_notes,
  -- WhatsApp - Visualização
  can_view_whatsapp, can_view_all_chats, can_view_assigned_chats, can_view_chat_history,
  -- WhatsApp - Ações
  can_send_messages, can_send_media, can_use_quick_replies, can_create_quick_replies,
  can_manage_quick_replies, can_assign_chats, can_transfer_chats, can_manage_tags, can_add_chat_notes,
  -- CRM
  can_access_crm, can_view_crm_calendar, can_edit_crm_calendar, can_manage_crm_pipeline,
  -- Banco de Dados
  can_access_database, can_view_all_database, can_export_database, can_import_database, can_bulk_delete_database,
  -- Contratos
  can_access_contracts, can_view_contracts, can_create_contracts, can_edit_own_contracts,
  can_edit_all_contracts, can_delete_contracts, can_approve_contracts, can_generate_contract_pdf,
  -- Ordens
  can_access_orders, can_view_orders, can_create_orders, can_edit_own_orders,
  can_edit_all_orders, can_delete_orders, can_approve_orders, can_generate_order_pdf,
  -- Catálogo
  can_access_catalog, can_view_products, can_create_products, can_edit_products,
  can_delete_products, can_manage_categories, can_manage_pricing,
  -- Usuários
  can_access_users, can_view_users, can_view_user_details, can_create_users,
  can_edit_users, can_delete_users, can_manage_roles, can_create_invites, can_view_user_activity,
  -- Configurações
  can_access_settings, can_edit_company_settings, can_manage_integrations,
  can_manage_whatsapp_config, can_manage_email_config, can_manage_payment_config,
  -- Relatórios
  can_view_reports, can_view_analytics, can_export_reports,
  can_view_sales_reports, can_view_team_performance, can_view_financial_reports,
  -- Sistema
  can_view_audit_logs, can_manage_system, can_manage_backups, can_view_system_logs, can_manage_api_keys
) VALUES
-- ===================== ADMINISTRADOR: ACESSO TOTAL =====================
('Administrador',
  -- Leads - Visualização (5)
  true, true, true, true, true,
  -- Leads - Criação e Edição (8)
  true, true, true, true, true, true, true, true,
  -- Leads - Ações (7)
  true, true, true, true, true, true, true,
  -- WhatsApp - Visualização (4)
  true, true, true, true,
  -- WhatsApp - Ações (9)
  true, true, true, true, true, true, true, true, true,
  -- CRM (4)
  true, true, true, true,
  -- Banco de Dados (5)
  true, true, true, true, true,
  -- Contratos (8)
  true, true, true, true, true, true, true, true,
  -- Ordens (8)
  true, true, true, true, true, true, true, true,
  -- Catálogo (7)
  true, true, true, true, true, true, true,
  -- Usuários (9)
  true, true, true, true, true, true, true, true, true,
  -- Configurações (6)
  true, true, true, true, true, true,
  -- Relatórios (6)
  true, true, true, true, true, true,
  -- Sistema (5)
  true, true, true, true, true
),

-- ===================== DESENVOLVEDOR: ACESSO TOTAL =====================
('Desenvolvedor',
  -- Leads - Visualização (5)
  true, true, true, true, true,
  -- Leads - Criação e Edição (8)
  true, true, true, true, true, true, true, true,
  -- Leads - Ações (7)
  true, true, true, true, true, true, true,
  -- WhatsApp - Visualização (4)
  true, true, true, true,
  -- WhatsApp - Ações (9)
  true, true, true, true, true, true, true, true, true,
  -- CRM (4)
  true, true, true, true,
  -- Banco de Dados (5)
  true, true, true, true, true,
  -- Contratos (8)
  true, true, true, true, true, true, true, true,
  -- Ordens (8)
  true, true, true, true, true, true, true, true,
  -- Catálogo (7)
  true, true, true, true, true, true, true,
  -- Usuários (9)
  true, true, true, true, true, true, true, true, true,
  -- Configurações (6)
  true, true, true, true, true, true,
  -- Relatórios (6)
  true, true, true, true, true, true,
  -- Sistema (5)
  true, true, true, true, true
),

-- ===================== VENDEDOR: CRM E LEADS =====================
('Vendedor',
  -- Leads - Visualização (5)
  true, true, false, true, true,
  -- Leads - Criação e Edição (8)
  true, true, false, false, false, false, true, false,
  -- Leads - Ações (7)
  false, false, true, true, true, true, false,
  -- WhatsApp - Visualização (4)
  true, false, true, true,
  -- WhatsApp - Ações (9)
  true, true, true, true, false, false, false, false, true,
  -- CRM (4)
  true, true, true, false,
  -- Banco de Dados (5)
  false, false, false, false, false,
  -- Contratos (8)
  false, false, false, false, false, false, false, false,
  -- Ordens (8)
  false, false, false, false, false, false, false, false,
  -- Catálogo (7)
  true, true, false, false, false, false, false,
  -- Usuários (9)
  false, false, false, false, false, false, false, false, false,
  -- Configurações (6)
  false, false, false, false, false, false,
  -- Relatórios (6)
  true, true, true, true, false, false,
  -- Sistema (5)
  false, false, false, false, false
),

-- ===================== FINANCEIRO: CONTRATOS E ORDENS =====================
('Financeiro',
  -- Leads - Visualização (5)
  false, false, false, false, false,
  -- Leads - Criação e Edição (8)
  false, false, false, false, false, false, false, false,
  -- Leads - Ações (7)
  false, false, false, false, false, false, false,
  -- WhatsApp - Visualização (4)
  false, false, false, false,
  -- WhatsApp - Ações (9)
  false, false, false, false, false, false, false, false, false,
  -- CRM (4)
  false, false, false, false,
  -- Banco de Dados (5)
  false, false, false, false, false,
  -- Contratos (8)
  true, true, true, true, true, false, true, true,
  -- Ordens (8)
  true, true, true, true, true, false, true, true,
  -- Catálogo (7)
  true, true, false, false, false, false, false,
  -- Usuários (9)
  false, false, false, false, false, false, false, false, false,
  -- Configurações (6)
  false, false, false, false, false, true,
  -- Relatórios (6)
  true, true, true, false, false, true,
  -- Sistema (5)
  false, false, false, false, false
)
ON CONFLICT (cargo_nome) DO NOTHING;

-- 5. Criar índice para melhorar performance
CREATE INDEX IF NOT EXISTS idx_cargo_permissions_cargo_nome ON cargo_permissions(cargo_nome);

-- 6. Comentários para documentação
COMMENT ON TABLE cargo_permissions IS 'Tabela de permissões granulares para cada cargo do sistema';
COMMENT ON COLUMN cargo_permissions.cargo_nome IS 'Nome do cargo (referência à tabela cargos)';

-- Verificar se tudo foi criado corretamente
SELECT 
  cargo_nome,
  can_view_leads,
  can_create_leads,
  can_access_crm,
  can_access_database,
  can_manage_system
FROM cargo_permissions
ORDER BY cargo_nome;
