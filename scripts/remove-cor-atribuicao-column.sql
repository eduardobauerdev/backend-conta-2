-- Remove cor_atribuicao column from perfis table as we now use role colors only

ALTER TABLE perfis
DROP COLUMN IF EXISTS cor_atribuicao;
