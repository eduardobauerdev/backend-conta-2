-- Create ordens table
CREATE TABLE IF NOT EXISTS ordens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_os VARCHAR(50) NOT NULL,
  cliente VARCHAR(255) NOT NULL,
  tipo_visita VARCHAR(100),
  vendedor VARCHAR(100),
  endereco TEXT,
  data VARCHAR(50),
  local TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on numero_os for faster lookups
CREATE INDEX IF NOT EXISTS idx_ordens_numero_os ON ordens(numero_os);

-- Insert some sample data
INSERT INTO ordens (numero_os, cliente, tipo_visita, vendedor, endereco, data, local) VALUES
  ('001', 'Cliente Exemplo 1', 'Instalação', 'João Silva', 'Rua A, 123', '2024-01-15', ''),
  ('002', 'Cliente Exemplo 2', 'Manutenção', 'Maria Santos', 'Rua B, 456', '2024-01-16', ''),
  ('003', 'Cliente Exemplo 3', 'Vistoria', 'Pedro Oliveira', 'Rua C, 789', '2024-01-17', '');
