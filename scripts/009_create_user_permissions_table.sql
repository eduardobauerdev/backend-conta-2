-- Criar tabela de permissões de usuários
CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
  
  -- Permissões de Leads
  can_view_leads BOOLEAN DEFAULT true,
  can_create_leads BOOLEAN DEFAULT true,
  can_edit_own_leads BOOLEAN DEFAULT true,
  can_edit_all_leads BOOLEAN DEFAULT false,
  can_delete_leads BOOLEAN DEFAULT false,
  can_export_leads BOOLEAN DEFAULT false,
  can_assign_leads BOOLEAN DEFAULT false,
  
  -- Permissões de CRM
  can_access_crm BOOLEAN DEFAULT true,
  can_convert_leads BOOLEAN DEFAULT true,
  
  -- Permissões de Banco de Dados
  can_access_database BOOLEAN DEFAULT false,
  can_view_all_leads BOOLEAN DEFAULT false,
  
  -- Permissões de Usuários
  can_view_users BOOLEAN DEFAULT false,
  can_create_users BOOLEAN DEFAULT false,
  can_edit_users BOOLEAN DEFAULT false,
  can_delete_users BOOLEAN DEFAULT false,
  can_create_invites BOOLEAN DEFAULT false,
  
  -- Permissões de Contratos e Ordens
  can_access_contracts BOOLEAN DEFAULT false,
  can_create_contracts BOOLEAN DEFAULT false,
  can_edit_contracts BOOLEAN DEFAULT false,
  can_access_orders BOOLEAN DEFAULT false,
  can_create_orders BOOLEAN DEFAULT false,
  can_edit_orders BOOLEAN DEFAULT false,
  
  -- Permissões de Sistema
  can_access_settings BOOLEAN DEFAULT false,
  can_view_audit_logs BOOLEAN DEFAULT false,
  can_manage_system BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice na coluna user_id
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);

-- Inserir permissões padrão para usuários existentes baseado no cargo
INSERT INTO user_permissions (
  user_id,
  can_view_leads, can_create_leads, can_edit_own_leads, can_edit_all_leads, can_delete_leads,
  can_export_leads, can_assign_leads, can_access_crm, can_convert_leads,
  can_access_database, can_view_all_leads,
  can_view_users, can_create_users, can_edit_users, can_delete_users, can_create_invites,
  can_access_contracts, can_create_contracts, can_edit_contracts,
  can_access_orders, can_create_orders, can_edit_orders,
  can_access_settings, can_view_audit_logs, can_manage_system
)
SELECT 
  id,
  -- Permissões baseadas no cargo
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE true
  END as can_view_leads,
  
  true as can_create_leads,
  true as can_edit_own_leads,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_edit_all_leads,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_delete_leads,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Vendedor') THEN true
    ELSE false
  END as can_export_leads,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_assign_leads,
  
  true as can_access_crm,
  true as can_convert_leads,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_access_database,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_view_all_leads,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_view_users,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_create_users,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_edit_users,
  
  CASE 
    WHEN cargo = 'Desenvolvedor' THEN true
    ELSE false
  END as can_delete_users,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_create_invites,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Financeiro') THEN true
    ELSE false
  END as can_access_contracts,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Financeiro') THEN true
    ELSE false
  END as can_create_contracts,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Financeiro') THEN true
    ELSE false
  END as can_edit_contracts,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Vendedor') THEN true
    ELSE false
  END as can_access_orders,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Vendedor') THEN true
    ELSE false
  END as can_create_orders,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador', 'Vendedor') THEN true
    ELSE false
  END as can_edit_orders,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_access_settings,
  
  CASE 
    WHEN cargo IN ('Desenvolvedor', 'Administrador') THEN true
    ELSE false
  END as can_view_audit_logs,
  
  CASE 
    WHEN cargo = 'Desenvolvedor' THEN true
    ELSE false
  END as can_manage_system
FROM perfis
WHERE NOT EXISTS (
  SELECT 1 FROM user_permissions WHERE user_permissions.user_id = perfis.id
);
