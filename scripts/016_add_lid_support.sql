-- ===========================================
-- SCRIPT SQL: Suporte a @lid e conversão para ID permanente
-- Execute este script no SQL Editor do Supabase
-- ===========================================

-- ===========================================
-- 1. ADICIONAR COLUNA telefone NA TABELA chats
-- O telefone é extraído apenas de IDs permanentes (@s.whatsapp.net)
-- ===========================================

ALTER TABLE public.chats 
ADD COLUMN IF NOT EXISTS telefone TEXT;

-- Índice para busca por telefone
CREATE INDEX IF NOT EXISTS idx_chats_telefone ON public.chats(telefone);

-- Popula telefone para chats existentes com IDs permanentes
UPDATE public.chats 
SET telefone = SPLIT_PART(id, '@', 1)
WHERE telefone IS NULL 
  AND (id LIKE '%@s.whatsapp.net' OR id LIKE '%@c.us');

COMMENT ON COLUMN public.chats.telefone IS 'Número de telefone real do contato (apenas para IDs permanentes)';

-- ===========================================
-- 2. TABELA DE MAPEAMENTO @lid -> UUID
-- Rastreia a relação entre IDs temporários e UUIDs dos chats
-- ===========================================

CREATE TABLE IF NOT EXISTS public.chat_lid_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lid_id TEXT NOT NULL UNIQUE,  -- O ID @lid temporário
    chat_uuid UUID NOT NULL,       -- UUID do chat no sistema
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Referência ao chat (pode ser removido se o chat for deletado)
    CONSTRAINT fk_chat_uuid FOREIGN KEY (chat_uuid) 
        REFERENCES public.chats(uuid) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_lid_mappings_lid ON public.chat_lid_mappings(lid_id);
CREATE INDEX IF NOT EXISTS idx_lid_mappings_uuid ON public.chat_lid_mappings(chat_uuid);

COMMENT ON TABLE public.chat_lid_mappings IS 'Mapeia IDs temporários @lid para UUIDs estáveis de chats';
COMMENT ON COLUMN public.chat_lid_mappings.lid_id IS 'ID temporário do WhatsApp (xxxxx@lid)';
COMMENT ON COLUMN public.chat_lid_mappings.chat_uuid IS 'UUID interno estável do chat';

-- ===========================================
-- 3. FUNÇÃO PARA BUSCAR CHAT POR TELEFONE OU @lid
-- ===========================================

CREATE OR REPLACE FUNCTION find_chat_by_phone_or_lid(
    p_identifier TEXT
)
RETURNS TABLE(
    chat_id TEXT,
    chat_uuid UUID,
    chat_name TEXT,
    chat_telefone TEXT
) AS $$
BEGIN
    -- Se parece ser um @lid, busca pelo mapeamento
    IF p_identifier LIKE '%@lid' THEN
        RETURN QUERY
        SELECT c.id, c.uuid, c.name, c.telefone
        FROM public.chats c
        INNER JOIN public.chat_lid_mappings m ON m.chat_uuid = c.uuid
        WHERE m.lid_id = p_identifier;
        
        -- Se não encontrou pelo mapeamento, busca direto
        IF NOT FOUND THEN
            RETURN QUERY
            SELECT c.id, c.uuid, c.name, c.telefone
            FROM public.chats c
            WHERE c.id = p_identifier;
        END IF;
    ELSE
        -- Busca pelo telefone ou ID
        RETURN QUERY
        SELECT c.id, c.uuid, c.name, c.telefone
        FROM public.chats c
        WHERE c.telefone = p_identifier
           OR c.id = p_identifier
           OR c.id LIKE p_identifier || '@%';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- 4. FUNÇÃO PARA CONVERTER @lid PARA ID PERMANENTE
-- Atualiza o chat mantendo o UUID e move mensagens
-- ===========================================

CREATE OR REPLACE FUNCTION convert_lid_to_permanent(
    p_lid_id TEXT,
    p_permanent_id TEXT,
    p_telefone TEXT
)
RETURNS UUID AS $$
DECLARE
    v_lid_uuid UUID;
    v_existing_uuid UUID;
BEGIN
    -- Busca o UUID do chat @lid
    SELECT uuid INTO v_lid_uuid 
    FROM public.chats 
    WHERE id = p_lid_id;
    
    -- Busca se já existe um chat com esse telefone
    SELECT uuid INTO v_existing_uuid 
    FROM public.chats 
    WHERE telefone = p_telefone AND id != p_lid_id;
    
    IF v_existing_uuid IS NOT NULL AND v_lid_uuid IS NOT NULL THEN
        -- Já existe um chat com esse telefone!
        -- Move mensagens do @lid para o chat existente
        UPDATE public.messages 
        SET chat_id = p_permanent_id, chat_uuid = v_existing_uuid
        WHERE chat_id = p_lid_id;
        
        -- Deleta o chat @lid
        DELETE FROM public.chats WHERE id = p_lid_id;
        
        RETURN v_existing_uuid;
    ELSIF v_lid_uuid IS NOT NULL THEN
        -- Apenas atualiza o chat @lid para o ID permanente
        UPDATE public.chats 
        SET id = p_permanent_id, telefone = p_telefone
        WHERE id = p_lid_id;
        
        -- Atualiza mensagens
        UPDATE public.messages 
        SET chat_id = p_permanent_id
        WHERE chat_id = p_lid_id;
        
        RETURN v_lid_uuid;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- 5. TRIGGER PARA AUTO-PREENCHER telefone
-- Quando um chat é criado/atualizado com ID permanente
-- ===========================================

CREATE OR REPLACE FUNCTION auto_fill_telefone()
RETURNS TRIGGER AS $$
BEGIN
    -- Extrai telefone apenas de IDs permanentes
    IF NEW.telefone IS NULL AND NEW.id IS NOT NULL THEN
        IF NEW.id LIKE '%@s.whatsapp.net' OR NEW.id LIKE '%@c.us' THEN
            NEW.telefone := SPLIT_PART(NEW.id, '@', 1);
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_fill_telefone ON public.chats;
CREATE TRIGGER trigger_auto_fill_telefone
    BEFORE INSERT OR UPDATE ON public.chats
    FOR EACH ROW
    EXECUTE FUNCTION auto_fill_telefone();

-- ===========================================
-- NOTAS IMPORTANTES:
-- ===========================================
-- 
-- PROBLEMA DO @lid:
-- - O WhatsApp usa IDs temporários @lid para novos contatos
-- - O número no @lid NÃO é o telefone real, é um ID interno
-- - Eventualmente, o WhatsApp converte para @s.whatsapp.net com telefone real
-- 
-- SOLUÇÃO:
-- 1. Quando um chat @lid é criado, salvamos o mapeamento lid -> uuid
-- 2. Quando recebemos o ID permanente, buscamos pelo telefone
-- 3. Se encontramos um @lid existente, convertemos mantendo o UUID
-- 4. Todas as associações (leads, etiquetas) continuam funcionando!
--
-- FLUXO:
-- 1. Mensagem chega com ID: 123456789@lid
-- 2. Criamos chat com uuid: abc-123, salvamos mapeamento
-- 3. WhatsApp envia update com ID: 5511999999999@s.whatsapp.net
-- 4. Detectamos que o telefone não existe ainda
-- 5. Mas temos o @lid mapeado para uuid: abc-123
-- 6. Atualizamos: id = 5511999999999@s.whatsapp.net, mantemos uuid = abc-123
-- ===========================================
