-- Tabela para armazenar respostas rápidas do WhatsApp
CREATE TABLE IF NOT EXISTS quick_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('saudacao', 'informacao', 'despedida', 'agendamento', 'suporte')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_id UUID REFERENCES perfis(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Índice para melhorar performance nas consultas por categoria
CREATE INDEX IF NOT EXISTS idx_quick_replies_category ON quick_replies(category);
CREATE INDEX IF NOT EXISTS idx_quick_replies_active ON quick_replies(is_active);

-- Inserir as respostas rápidas padrão
INSERT INTO quick_replies (title, message, category) VALUES
  ('Boas-vindas', 'Olá! Obrigado por entrar em contato. Como posso ajudá-lo hoje?', 'saudacao'),
  ('Horário de Atendimento', 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.', 'informacao'),
  ('Informações sobre Planos', 'Temos 3 planos disponíveis: Básico (R$ 29/mês), Profissional (R$ 79/mês) e Enterprise (R$ 199/mês). Qual te interessa?', 'informacao'),
  ('Agendar Reunião', 'Gostaria de agendar uma reunião? Por favor, me informe sua disponibilidade.', 'agendamento'),
  ('Enviar Proposta', 'Vou enviar uma proposta detalhada para seu e-mail. Você receberá em alguns minutos.', 'informacao'),
  ('Suporte Técnico', 'Vou encaminhar você para nossa equipe de suporte técnico. Aguarde um momento.', 'suporte'),
  ('Agradecimento', 'Muito obrigado pelo contato! Estamos à disposição para ajudar.', 'despedida'),
  ('Até Logo', 'Foi um prazer atendê-lo! Tenha um ótimo dia!', 'despedida');
