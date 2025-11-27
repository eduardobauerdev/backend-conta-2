-- Adicionar colunas de perfil do usuário na tabela perfis
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS nome VARCHAR(255);
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS foto_perfil TEXT;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS ultimo_login TIMESTAMP WITH TIME ZONE;

-- Atualizar usuários existentes com dados padrão
UPDATE perfis SET nome = 'Usuário' WHERE nome IS NULL;
UPDATE perfis SET ultimo_login = updated_at WHERE ultimo_login IS NULL;

COMMENT ON COLUMN perfis.nome IS 'Nome completo do usuário';
COMMENT ON COLUMN perfis.foto_perfil IS 'URL da foto de perfil do usuário';
COMMENT ON COLUMN perfis.ultimo_login IS 'Data e hora do último login do usuário';
