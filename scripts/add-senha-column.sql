-- Add senha (password) column to perfis table if it doesn't exist
-- Added IF NOT EXISTS to prevent error when column already exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'perfis' 
        AND column_name = 'senha'
    ) THEN
        ALTER TABLE perfis ADD COLUMN senha TEXT;
        COMMENT ON COLUMN perfis.senha IS 'Hashed password for user authentication';
    END IF;
END $$;
