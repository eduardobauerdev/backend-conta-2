-- Tabela para categorias de respostas rápidas
CREATE TABLE IF NOT EXISTS quick_reply_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  created_by_id UUID REFERENCES perfis(id) ON DELETE SET NULL,
  created_by_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir categorias padrão
INSERT INTO quick_reply_categories (name, created_by_name) VALUES 
  ('Saudação', 'Sistema'),
  ('Informação', 'Sistema'),
  ('Despedida', 'Sistema'),
  ('Agendamento', 'Sistema'),
  ('Suporte', 'Sistema')
ON CONFLICT (name) DO NOTHING;

-- Atualizar tabela quick_replies para referenciar categorias
ALTER TABLE quick_replies 
  ADD COLUMN IF NOT EXISTS created_by_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES quick_reply_categories(id) ON DELETE SET NULL;

-- Popular category_id baseado no category antigo
UPDATE quick_replies qr
SET category_id = qrc.id
FROM quick_reply_categories qrc
WHERE LOWER(qr.category) = LOWER(qrc.name);
