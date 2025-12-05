-- ============================================================
-- MIGRAÇÃO: Suporte completo a @lid com metadados
-- ============================================================
-- Esta migração adiciona colunas para armazenar todos os metadados
-- que o Baileys fornece, permitindo rastrear e mesclar @lid com 
-- IDs permanentes quando o WhatsApp fornecer o telefone real.
-- ============================================================

-- 1. Adicionar colunas de metadados na tabela chats
ALTER TABLE chats ADD COLUMN IF NOT EXISTS is_lid BOOLEAN DEFAULT FALSE;
ALTER TABLE chats ADD COLUMN IF NOT EXISTS lid_metadata JSONB DEFAULT NULL;
ALTER TABLE chats ADD COLUMN IF NOT EXISTS push_name TEXT DEFAULT NULL;
ALTER TABLE chats ADD COLUMN IF NOT EXISTS verified_name TEXT DEFAULT NULL;
ALTER TABLE chats ADD COLUMN IF NOT EXISTS original_lid_id TEXT DEFAULT NULL;

-- 2. Criar índices para busca eficiente
CREATE INDEX IF NOT EXISTS idx_chats_is_lid ON chats(is_lid) WHERE is_lid = TRUE;
CREATE INDEX IF NOT EXISTS idx_chats_push_name ON chats(push_name) WHERE push_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_chats_original_lid_id ON chats(original_lid_id) WHERE original_lid_id IS NOT NULL;

-- 3. Adicionar coluna de metadados nas mensagens também
ALTER TABLE messages ADD COLUMN IF NOT EXISTS sender_metadata JSONB DEFAULT NULL;

-- 4. Comentários explicativos
COMMENT ON COLUMN chats.is_lid IS 'Indica se o chat foi criado com um ID @lid temporário';
COMMENT ON COLUMN chats.lid_metadata IS 'JSON com todos os metadados do Baileys quando era @lid (para debug e matching)';
COMMENT ON COLUMN chats.push_name IS 'Nome do contato no WhatsApp (pushName) - usado para matching de @lid';
COMMENT ON COLUMN chats.verified_name IS 'Nome verificado do contato (business accounts)';
COMMENT ON COLUMN chats.original_lid_id IS 'Se o chat foi convertido de @lid, guarda o ID original para referência';
COMMENT ON COLUMN messages.sender_metadata IS 'Metadados do remetente incluindo sender_pn, participant_pn, etc.';

-- 5. Função para buscar chat @lid por metadados
CREATE OR REPLACE FUNCTION find_lid_chat_by_metadata(
    p_push_name TEXT DEFAULT NULL,
    p_verified_name TEXT DEFAULT NULL
) RETURNS TABLE(
    id TEXT,
    uuid UUID,
    push_name TEXT,
    verified_name TEXT,
    lid_metadata JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.uuid,
        c.push_name,
        c.verified_name,
        c.lid_metadata
    FROM chats c
    WHERE c.is_lid = TRUE
    AND (
        (p_push_name IS NOT NULL AND c.push_name = p_push_name)
        OR (p_verified_name IS NOT NULL AND c.verified_name = p_verified_name)
    )
    ORDER BY c.last_message_time DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql;

-- 6. Função para mesclar chat @lid com chat permanente
CREATE OR REPLACE FUNCTION merge_lid_to_permanent(
    p_lid_id TEXT,
    p_permanent_id TEXT,
    p_telefone TEXT
) RETURNS UUID AS $$
DECLARE
    v_lid_uuid UUID;
    v_perm_uuid UUID;
    v_final_uuid UUID;
    v_lid_metadata JSONB;
BEGIN
    -- Busca o chat @lid
    SELECT uuid, lid_metadata INTO v_lid_uuid, v_lid_metadata
    FROM chats WHERE id = p_lid_id;
    
    -- Busca se já existe chat permanente com esse telefone
    SELECT uuid INTO v_perm_uuid
    FROM chats WHERE telefone = p_telefone AND id != p_lid_id
    LIMIT 1;
    
    IF v_perm_uuid IS NOT NULL AND v_lid_uuid IS NOT NULL THEN
        -- Já existe chat permanente - mesclar
        -- Move mensagens do @lid para o permanente
        UPDATE messages 
        SET chat_id = p_permanent_id, chat_uuid = v_perm_uuid
        WHERE chat_id = p_lid_id;
        
        -- Guarda referência do @lid original no chat permanente
        UPDATE chats 
        SET original_lid_id = p_lid_id,
            lid_metadata = COALESCE(lid_metadata, '{}') || v_lid_metadata
        WHERE uuid = v_perm_uuid;
        
        -- Deleta o chat @lid
        DELETE FROM chats WHERE id = p_lid_id;
        
        v_final_uuid := v_perm_uuid;
    ELSIF v_lid_uuid IS NOT NULL THEN
        -- Não existe chat permanente - atualizar o @lid
        UPDATE chats 
        SET id = p_permanent_id,
            telefone = p_telefone,
            is_lid = FALSE,
            original_lid_id = p_lid_id
        WHERE id = p_lid_id;
        
        -- Atualiza mensagens
        UPDATE messages 
        SET chat_id = p_permanent_id
        WHERE chat_id = p_lid_id;
        
        v_final_uuid := v_lid_uuid;
    END IF;
    
    RETURN v_final_uuid;
END;
$$ LANGUAGE plpgsql;
