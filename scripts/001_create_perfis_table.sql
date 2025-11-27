-- Criar tabela perfis
CREATE TABLE IF NOT EXISTS perfis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice no email para busca rápida
CREATE INDEX IF NOT EXISTS idx_perfis_email ON perfis(email);

-- Inserir alguns dados de exemplo (REMOVER EM PRODUÇÃO)
-- Senha: 'senha123' (em produção, use hash bcrypt)
INSERT INTO perfis (email, senha, cargo) VALUES 
  ('admin@exemplo.com', 'senha123', 'Administrador'),
  ('usuario@exemplo.com', 'senha123', 'Usuário')
ON CONFLICT (email) DO NOTHING;
