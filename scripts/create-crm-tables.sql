-- Tabela de leads
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  endereco TEXT,
  telefone VARCHAR(50),
  temperatura VARCHAR(20) CHECK (temperatura IN ('Quente', 'Morno', 'Frio')),
  proximo_contato DATE,
  dia_semana DATE NOT NULL,
  adicionado_por_id UUID REFERENCES public.perfis(id),
  adicionado_por_nome VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs de movimentação
CREATE TABLE IF NOT EXISTS public.lead_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES public.perfis(id),
  usuario_nome VARCHAR(255) NOT NULL,
  acao VARCHAR(50) NOT NULL,
  de_data DATE,
  para_data DATE,
  detalhes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_dia_semana ON public.leads(dia_semana);
CREATE INDEX IF NOT EXISTS idx_leads_temperatura ON public.leads(temperatura);
CREATE INDEX IF NOT EXISTS idx_lead_logs_lead_id ON public.lead_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_logs_created_at ON public.lead_logs(created_at DESC);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
