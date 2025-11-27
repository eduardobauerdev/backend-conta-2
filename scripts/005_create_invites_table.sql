-- Create invites table for user invitation links
CREATE TABLE IF NOT EXISTS convites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR(255) UNIQUE NOT NULL,
  cargo VARCHAR(50) NOT NULL,
  criado_por_id UUID REFERENCES perfis(id),
  criado_por_nome VARCHAR(255),
  expira_em TIMESTAMP WITH TIME ZONE NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  usado_em TIMESTAMP WITH TIME ZONE,
  usado_por_id UUID REFERENCES perfis(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_convites_token ON convites(token);
CREATE INDEX IF NOT EXISTS idx_convites_usado ON convites(usado);
CREATE INDEX IF NOT EXISTS idx_convites_expira_em ON convites(expira_em);
