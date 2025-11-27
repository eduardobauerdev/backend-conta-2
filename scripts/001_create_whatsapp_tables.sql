-- Tabela para configuração do WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_url TEXT NOT NULL,
  is_connected BOOLEAN DEFAULT FALSE,
  connected_phone TEXT,
  connected_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para cache de chats (opcional, para performance)
CREATE TABLE IF NOT EXISTS whatsapp_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id TEXT NOT NULL UNIQUE,
  contact_phone TEXT NOT NULL,
  contact_name TEXT,
  last_message_preview TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE,
  unread_count INTEGER DEFAULT 0,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_cache_contact_phone ON whatsapp_cache(contact_phone);
CREATE INDEX IF NOT EXISTS idx_whatsapp_cache_lead_id ON whatsapp_cache(lead_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_cache_last_message_at ON whatsapp_cache(last_message_at DESC);

-- Inserir configuração padrão (servidor precisa ser configurado pelo admin)
INSERT INTO whatsapp_config (server_url, is_connected)
VALUES ('http://localhost:3001', FALSE)
ON CONFLICT DO NOTHING;
