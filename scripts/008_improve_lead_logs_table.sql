-- Melhorar a tabela de logs de leads
ALTER TABLE lead_logs DROP COLUMN IF EXISTS de_data;
ALTER TABLE lead_logs DROP COLUMN IF EXISTS para_data;

-- Adicionar colunas mais flexíveis para registrar mudanças
ALTER TABLE lead_logs ADD COLUMN IF NOT EXISTS campo_alterado VARCHAR(100);
ALTER TABLE lead_logs ADD COLUMN IF NOT EXISTS valor_antigo TEXT;
ALTER TABLE lead_logs ADD COLUMN IF NOT EXISTS valor_novo TEXT;

-- Atualizar a coluna acao para ter valores mais descritivos
ALTER TABLE lead_logs ALTER COLUMN acao TYPE VARCHAR(50);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_lead_logs_lead_id ON lead_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_logs_usuario_id ON lead_logs(usuario_id);
CREATE INDEX IF NOT EXISTS idx_lead_logs_created_at ON lead_logs(created_at);

-- Comentários nas colunas
COMMENT ON COLUMN lead_logs.campo_alterado IS 'Nome do campo que foi alterado (ex: nome, telefone, temperatura)';
COMMENT ON COLUMN lead_logs.valor_antigo IS 'Valor anterior do campo';
COMMENT ON COLUMN lead_logs.valor_novo IS 'Novo valor do campo';
COMMENT ON COLUMN lead_logs.acao IS 'Tipo de ação realizada (editar, criar, deletar)';
