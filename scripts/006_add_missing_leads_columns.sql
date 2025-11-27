-- Adicionar colunas que faltam na tabela leads
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS cidade VARCHAR(255),
ADD COLUMN IF NOT EXISTS interesse TEXT,
ADD COLUMN IF NOT EXISTS cargo VARCHAR(255),
ADD COLUMN IF NOT EXISTS acao VARCHAR(100),
ADD COLUMN IF NOT EXISTS observacao TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'ativo';

-- Criar índice para facilitar filtros por cidade
CREATE INDEX IF NOT EXISTS idx_leads_cidade ON public.leads(cidade);

-- Criar índice para facilitar filtros por status
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
