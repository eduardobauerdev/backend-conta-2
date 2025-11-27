-- Create cargos table
CREATE TABLE IF NOT EXISTS cargos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR NOT NULL UNIQUE,
  cor VARCHAR NOT NULL,
  descricao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by_id UUID,
  created_by_nome VARCHAR
);

-- Insert default roles
INSERT INTO cargos (nome, cor, descricao) VALUES
  ('Administrador', '#ef4444', 'Acesso completo ao sistema'),
  ('Desenvolvedor', '#a855f7', 'Acesso técnico e administrativo'),
  ('Vendedor', '#3b82f6', 'Acesso a CRM e leads'),
  ('Financeiro', '#22c55e', 'Acesso a contratos e ordens de serviço')
ON CONFLICT (nome) DO NOTHING;

-- Create cargo_permissions table
CREATE TABLE IF NOT EXISTS cargo_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cargo_nome VARCHAR NOT NULL UNIQUE REFERENCES cargos(nome) ON DELETE CASCADE ON UPDATE CASCADE,
  -- Leads
  can_view_leads BOOLEAN DEFAULT false,
  can_create_leads BOOLEAN DEFAULT false,
  can_edit_own_leads BOOLEAN DEFAULT false,
  can_edit_all_leads BOOLEAN DEFAULT false,
  can_delete_leads BOOLEAN DEFAULT false,
  can_export_leads BOOLEAN DEFAULT false,
  can_assign_leads BOOLEAN DEFAULT false,
  can_convert_leads BOOLEAN DEFAULT false,
  can_view_all_leads BOOLEAN DEFAULT false,
  -- Modules
  can_access_crm BOOLEAN DEFAULT false,
  can_access_database BOOLEAN DEFAULT false,
  can_access_contracts BOOLEAN DEFAULT false,
  can_access_orders BOOLEAN DEFAULT false,
  can_access_settings BOOLEAN DEFAULT false,
  -- Users
  can_view_users BOOLEAN DEFAULT false,
  can_create_users BOOLEAN DEFAULT false,
  can_edit_users BOOLEAN DEFAULT false,
  can_delete_users BOOLEAN DEFAULT false,
  can_create_invites BOOLEAN DEFAULT false,
  -- Contracts & Orders
  can_create_contracts BOOLEAN DEFAULT false,
  can_edit_contracts BOOLEAN DEFAULT false,
  can_create_orders BOOLEAN DEFAULT false,
  can_edit_orders BOOLEAN DEFAULT false,
  -- System
  can_view_audit_logs BOOLEAN DEFAULT false,
  can_manage_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default permissions for each role
INSERT INTO cargo_permissions (
  cargo_nome,
  can_view_leads, can_create_leads, can_edit_own_leads, can_edit_all_leads,
  can_delete_leads, can_export_leads, can_assign_leads, can_convert_leads,
  can_view_all_leads, can_access_crm, can_access_database, can_access_contracts,
  can_access_orders, can_access_settings, can_view_users, can_create_users,
  can_edit_users, can_delete_users, can_create_invites, can_create_contracts,
  can_edit_contracts, can_create_orders, can_edit_orders, can_view_audit_logs,
  can_manage_system
) VALUES
  -- Administrador: full access
  ('Administrador', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true),
  -- Desenvolvedor: full access
  ('Desenvolvedor', true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true),
  -- Vendedor: CRM and leads
  ('Vendedor', true, true, true, false, false, true, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false),
  -- Financeiro: contracts and orders
  ('Financeiro', false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, true, true, false, false)
ON CONFLICT (cargo_nome) DO NOTHING;
