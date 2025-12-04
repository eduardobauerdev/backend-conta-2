-- ===========================================
-- SCRIPT SQL: Histórico Unificado de Chat
-- Execute este script no SQL Editor do Supabase
-- ===========================================

-- ===========================================
-- 1. TABELA DE HISTÓRICO UNIFICADO
-- Armazena todos os eventos de um chat em um só lugar
-- ===========================================

CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Referência ao chat
  chat_id VARCHAR(255) NOT NULL,
  chat_name VARCHAR(255),
  
  -- Tipo de evento
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
    'assignment_created',    -- Atribuição criada
    'assignment_transferred', -- Atribuição transferida
    'assignment_removed',    -- Atribuição removida
    'note_created',          -- Nota criada
    'note_updated',          -- Nota atualizada
    'etiqueta_added',        -- Etiqueta adicionada
    'etiqueta_removed',      -- Etiqueta removida
    'name_changed'           -- Nome do contato alterado
  )),
  
  -- Dados do evento (flexível para diferentes tipos)
  event_data JSONB NOT NULL DEFAULT '{}',
  
  -- Quem realizou a ação
  performed_by_id UUID REFERENCES public.perfis(id) ON DELETE SET NULL,
  performed_by_name VARCHAR(255) NOT NULL,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_chat_history_chat_id ON public.chat_history(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_created_at ON public.chat_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_history_event_type ON public.chat_history(event_type);
CREATE INDEX IF NOT EXISTS idx_chat_history_performed_by ON public.chat_history(performed_by_id);

-- Comentários
COMMENT ON TABLE public.chat_history IS 'Histórico unificado de todos os eventos de um chat';
COMMENT ON COLUMN public.chat_history.event_type IS 'Tipo do evento registrado';
COMMENT ON COLUMN public.chat_history.event_data IS 'Dados específicos do evento em formato JSON';

-- ===========================================
-- 2. POLÍTICAS DE SEGURANÇA (RLS)
-- ===========================================

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios podem ver historico" ON public.chat_history
  FOR SELECT USING (true);

CREATE POLICY "Usuarios podem inserir historico" ON public.chat_history
  FOR INSERT WITH CHECK (true);

-- ===========================================
-- 3. EXEMPLOS DE event_data POR TIPO
-- ===========================================

-- assignment_created:
-- {
--   "assigned_to_id": "uuid",
--   "assigned_to_name": "João Silva"
-- }

-- assignment_transferred:
-- {
--   "from_user_id": "uuid",
--   "from_user_name": "João Silva",
--   "to_user_id": "uuid",
--   "to_user_name": "Maria Santos"
-- }

-- assignment_removed:
-- {
--   "removed_user_id": "uuid",
--   "removed_user_name": "João Silva"
-- }

-- note_created:
-- {
--   "content": "Texto da nota..."
-- }

-- note_updated:
-- {
--   "previous_content": "Texto antigo...",
--   "new_content": "Texto novo..."
-- }

-- etiqueta_added:
-- {
--   "etiqueta_id": "uuid",
--   "etiqueta_nome": "Urgente",
--   "etiqueta_cor": "#ff0000"
-- }

-- etiqueta_removed:
-- {
--   "etiqueta_id": "uuid",
--   "etiqueta_nome": "Urgente",
--   "etiqueta_cor": "#ff0000"
-- }

-- name_changed:
-- {
--   "previous_name": "5511999999999",
--   "new_name": "João Silva"
-- }

-- ===========================================
-- FINALIZADO!
-- ===========================================
