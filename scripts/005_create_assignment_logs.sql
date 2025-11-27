-- Criar tabela para logs de atribuições
CREATE TABLE IF NOT EXISTS assignment_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_id TEXT NOT NULL,
    chat_name TEXT NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'assigned', 'transferred', 'released', 'completed'
    from_user_id UUID,
    from_user_name VARCHAR(255),
    to_user_id UUID,
    to_user_name VARCHAR(255),
    performed_by_id UUID,
    performed_by_name VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_assignment_logs_chat_id ON assignment_logs(chat_id);
CREATE INDEX IF NOT EXISTS idx_assignment_logs_created_at ON assignment_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assignment_logs_to_user ON assignment_logs(to_user_id);

-- Comentários
COMMENT ON TABLE assignment_logs IS 'Histórico de todas as atribuições e transferências de conversas';
COMMENT ON COLUMN assignment_logs.action IS 'Tipo de ação: assigned (atribuído), transferred (transferido), released (liberado), completed (completado)';
COMMENT ON COLUMN assignment_logs.from_user_id IS 'Usuário que estava com a conversa antes (em caso de transferência)';
COMMENT ON COLUMN assignment_logs.to_user_id IS 'Usuário que recebeu a conversa';
COMMENT ON COLUMN assignment_logs.performed_by_id IS 'Usuário que executou a ação (admin/dev fazendo atribuição manual)';
