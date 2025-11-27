-- Add cor_atribuicao column to perfis table
-- This column stores the custom assignment badge color for each user

ALTER TABLE perfis 
ADD COLUMN IF NOT EXISTS cor_atribuicao VARCHAR(7);

-- Set default color for existing users (blue)
UPDATE perfis 
SET cor_atribuicao = '#3b82f6' 
WHERE cor_atribuicao IS NULL;

-- Add comment to document the column
COMMENT ON COLUMN perfis.cor_atribuicao IS 'Custom hex color for user assignment badges (e.g., #3b82f6)';
