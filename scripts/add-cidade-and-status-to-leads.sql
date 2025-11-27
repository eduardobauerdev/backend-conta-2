-- Adding cidade (city) and status columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS cidade VARCHAR(255);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'ativo';
