-- Adiciona coluna para configuração de exibição de etiquetas
ALTER TABLE perfis 
ADD COLUMN IF NOT EXISTS show_all_tags BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN perfis.show_all_tags IS 'Quando ligada, exibe visualmente todas as etiquetas. Quando desligada exibe apenas um ícone cinza com o número de etiquetas. Esta opção é puramente visual.';
