-- Update existing cargos to match new structure
-- This script migrates old cargos (Gerente, Líder, Operador) to new ones

-- Migrate Gerente and Líder to Vendedor
UPDATE perfis 
SET cargo = 'Vendedor' 
WHERE cargo IN ('Gerente', 'Líder');

-- Migrate Operador to Financeiro
UPDATE perfis 
SET cargo = 'Financeiro' 
WHERE cargo = 'Operador';

-- Update any invites with old cargos
UPDATE convites 
SET cargo = 'Vendedor' 
WHERE cargo IN ('Gerente', 'Líder');

UPDATE convites 
SET cargo = 'Financeiro' 
WHERE cargo = 'Operador';
