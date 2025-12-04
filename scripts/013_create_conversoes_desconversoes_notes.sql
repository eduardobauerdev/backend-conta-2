-- ===========================================
-- SCRIPT SQL: Tabelas para Conversões, Desconversões e Notas de Chat
-- Execute este script no SQL Editor do Supabase
-- ===========================================

-- ===========================================
-- 1. TABELA DE CONVERSÕES (CRM)
-- Armazena dados completos quando um lead é convertido
-- ===========================================

CREATE TABLE IF NOT EXISTS public.conversoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dados do Lead no momento da conversão
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  lead_nome VARCHAR(255) NOT NULL,
  lead_cidade VARCHAR(255),
  lead_interesse TEXT,
  lead_temperatura VARCHAR(20),
  lead_telefone VARCHAR(50),
  lead_endereco TEXT,
  lead_cargo VARCHAR(100),
  lead_observacao TEXT,
  lead_adicionado_por_id UUID,
  lead_adicionado_por_nome VARCHAR(255),
  
  -- Dados do usuário que fez a conversão
  convertido_por_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
  convertido_por_nome VARCHAR(255) NOT NULL,
  convertido_por_cargo VARCHAR(100),
  
  -- Dados da venda
  valor DECIMAL(15, 2) NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance e análise
CREATE INDEX IF NOT EXISTS idx_conversoes_lead_id ON public.conversoes(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversoes_convertido_por_id ON public.conversoes(convertido_por_id);
CREATE INDEX IF NOT EXISTS idx_conversoes_created_at ON public.conversoes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversoes_valor ON public.conversoes(valor);
CREATE INDEX IF NOT EXISTS idx_conversoes_lead_cidade ON public.conversoes(lead_cidade);
CREATE INDEX IF NOT EXISTS idx_conversoes_lead_temperatura ON public.conversoes(lead_temperatura);

-- Comentários para documentação
COMMENT ON TABLE public.conversoes IS 'Registra conversões de leads com dados completos para análise';
COMMENT ON COLUMN public.conversoes.valor IS 'Valor da venda em reais';

-- ===========================================
-- 2. TABELA DE DESCONVERSÕES (CRM)
-- Armazena motivos quando um lead é desconvertido
-- ===========================================

CREATE TABLE IF NOT EXISTS public.desconversoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Dados do Lead
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  lead_nome VARCHAR(255) NOT NULL,
  lead_cidade VARCHAR(255),
  lead_interesse TEXT,
  lead_temperatura VARCHAR(20),
  lead_telefone VARCHAR(50),
  lead_adicionado_por_id UUID,
  lead_adicionado_por_nome VARCHAR(255),
  
  -- Dados do usuário que fez a desconversão
  desconvertido_por_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
  desconvertido_por_nome VARCHAR(255) NOT NULL,
  desconvertido_por_cargo VARCHAR(100),
  
  -- Motivo da desconversão
  motivo TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para análise
CREATE INDEX IF NOT EXISTS idx_desconversoes_lead_id ON public.desconversoes(lead_id);
CREATE INDEX IF NOT EXISTS idx_desconversoes_desconvertido_por_id ON public.desconversoes(desconvertido_por_id);
CREATE INDEX IF NOT EXISTS idx_desconversoes_created_at ON public.desconversoes(created_at DESC);

-- Comentários para documentação
COMMENT ON TABLE public.desconversoes IS 'Registra desconversões de leads com motivos para análise';

-- ===========================================
-- 3. TABELA DE NOTAS DE CHAT (WhatsApp)
-- Armazena nota atual de cada chat
-- ===========================================

CREATE TABLE IF NOT EXISTS public.chat_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Referência ao chat
  chat_id VARCHAR(255) NOT NULL UNIQUE,
  chat_name VARCHAR(255),
  
  -- Conteúdo da nota
  content TEXT,
  
  -- Quem criou/atualizou
  created_by_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
  created_by_name VARCHAR(255) NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_chat_notes_chat_id ON public.chat_notes(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_notes_created_by_id ON public.chat_notes(created_by_id);

-- Comentários
COMMENT ON TABLE public.chat_notes IS 'Notas atuais associadas a chats do WhatsApp';

-- ===========================================
-- 4. TABELA DE HISTÓRICO DE NOTAS (WhatsApp)
-- Armazena todas as alterações de notas
-- ===========================================

CREATE TABLE IF NOT EXISTS public.chat_notes_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Referência ao chat
  chat_id VARCHAR(255) NOT NULL,
  chat_name VARCHAR(255),
  
  -- Tipo de ação
  action VARCHAR(20) NOT NULL CHECK (action IN ('created', 'updated')),
  
  -- Conteúdo anterior e novo
  previous_content TEXT,
  new_content TEXT NOT NULL,
  
  -- Quem realizou a ação
  performed_by_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
  performed_by_name VARCHAR(255) NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para consultas
CREATE INDEX IF NOT EXISTS idx_chat_notes_history_chat_id ON public.chat_notes_history(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_notes_history_created_at ON public.chat_notes_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_notes_history_performed_by_id ON public.chat_notes_history(performed_by_id);

-- Comentários
COMMENT ON TABLE public.chat_notes_history IS 'Histórico de todas as alterações em notas de chat';

-- ===========================================
-- 5. TRIGGER PARA ATUALIZAR updated_at
-- ===========================================

-- Trigger para conversoes
CREATE TRIGGER update_conversoes_updated_at
  BEFORE UPDATE ON public.conversoes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para chat_notes
CREATE TRIGGER update_chat_notes_updated_at
  BEFORE UPDATE ON public.chat_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- 6. POLÍTICAS DE SEGURANÇA (RLS)
-- ===========================================

-- Habilitar RLS
ALTER TABLE public.conversoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.desconversoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_notes_history ENABLE ROW LEVEL SECURITY;

-- Políticas para conversoes (usuários autenticados podem ler e inserir)
CREATE POLICY "Usuarios podem ver conversoes" ON public.conversoes
  FOR SELECT USING (true);

CREATE POLICY "Usuarios podem inserir conversoes" ON public.conversoes
  FOR INSERT WITH CHECK (true);

-- Políticas para desconversoes
CREATE POLICY "Usuarios podem ver desconversoes" ON public.desconversoes
  FOR SELECT USING (true);

CREATE POLICY "Usuarios podem inserir desconversoes" ON public.desconversoes
  FOR INSERT WITH CHECK (true);

-- Políticas para chat_notes
CREATE POLICY "Usuarios podem ver notas" ON public.chat_notes
  FOR SELECT USING (true);

CREATE POLICY "Usuarios podem inserir notas" ON public.chat_notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuarios podem atualizar notas" ON public.chat_notes
  FOR UPDATE USING (true);

-- Políticas para chat_notes_history
CREATE POLICY "Usuarios podem ver historico de notas" ON public.chat_notes_history
  FOR SELECT USING (true);

CREATE POLICY "Usuarios podem inserir historico de notas" ON public.chat_notes_history
  FOR INSERT WITH CHECK (true);

-- ===========================================
-- FINALIZADO!
-- ===========================================
