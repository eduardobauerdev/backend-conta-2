-- Add dispositivo_login column to perfis table
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS dispositivo_login TEXT;

COMMENT ON COLUMN perfis.dispositivo_login IS 'Dispositivo usado no último login (user agent)';
