-- Tabela para rastreamento de atribuições de conversas
CREATE TABLE IF NOT EXISTS chat_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id TEXT NOT NULL,
    chat_name TEXT NOT NULL,
    assigned_to_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
    assigned_to_name VARCHAR(255) NOT NULL,
    assigned_by_id UUID REFERENCES perfis(id) ON DELETE SET NULL,
    assigned_by_name VARCHAR(255),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'transferred')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(chat_id, status)
);

-- Tabela para rastreamento de mensagens enviadas
CREATE TABLE IF NOT EXISTS message_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id TEXT NOT NULL,
    chat_id TEXT NOT NULL,
    sent_by_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
    sent_by_name VARCHAR(255) NOT NULL,
    message_body TEXT,
    message_type VARCHAR(50) DEFAULT 'text',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para rastreamento de atividade em tempo real
CREATE TABLE IF NOT EXISTS chat_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES perfis(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('viewing', 'typing')),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(chat_id, user_id, activity_type)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_chat_assignments_chat_id ON chat_assignments(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_assignments_assigned_to ON chat_assignments(assigned_to_id);
CREATE INDEX IF NOT EXISTS idx_chat_assignments_status ON chat_assignments(status);
CREATE INDEX IF NOT EXISTS idx_message_tracking_chat_id ON message_tracking(chat_id);
CREATE INDEX IF NOT EXISTS idx_message_tracking_sent_by ON message_tracking(sent_by_id);
CREATE INDEX IF NOT EXISTS idx_chat_activity_chat_id ON chat_activity(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_activity_user_id ON chat_activity(user_id);

-- Função para limpar atividades antigas (mais de 5 minutos)
CREATE OR REPLACE FUNCTION cleanup_old_chat_activities()
RETURNS void AS $$
BEGIN
    DELETE FROM chat_activity
    WHERE last_activity_at < NOW() - INTERVAL '5 minutes';
END;
$$ LANGUAGE plpgsql;

-- Comentários das tabelas
COMMENT ON TABLE chat_assignments IS 'Rastreamento de atribuições de conversas para atendentes';
COMMENT ON TABLE message_tracking IS 'Rastreamento de mensagens enviadas por cada atendente';
COMMENT ON TABLE chat_activity IS 'Rastreamento de atividade em tempo real (visualizando/digitando)';
