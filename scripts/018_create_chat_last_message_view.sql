-- =====================================================
-- SCRIPT SQL COMPLETO: View para última mensagem de cada chat
-- Execute este script inteiro no SQL Editor do Supabase
-- =====================================================

-- 1. Primeiro, drop da view se ela já existir
DROP VIEW IF EXISTS chat_last_message_view;

-- 2. Cria a view que retorna a última mensagem de cada chat
CREATE VIEW chat_last_message_view AS
WITH last_messages AS (
  SELECT DISTINCT ON (chat_id)
    chat_id,
    content as latest_msg_content,
    timestamp as latest_msg_timestamp,
    type as latest_msg_type,
    from_me as latest_msg_from_me
  FROM messages
  ORDER BY chat_id, timestamp DESC
)
SELECT 
  c.id,
  c.uuid,
  c.name,
  c.phone,
  c.image_url,
  c.unread_count,
  c.is_group,
  c.is_archived,
  c.data_visual,
  c.is_lid,
  c.original_lid_id,
  c.push_name,
  c.verified_name,
  c.lid_metadata,
  c.etiqueta_ids,
  c.last_message_time,
  -- Colunas da última mensagem (prioriza a da tabela messages)
  COALESCE(lm.latest_msg_content, c.last_message) as last_message,
  COALESCE(lm.latest_msg_timestamp, c.last_message_time) as last_message_timestamp,
  lm.latest_msg_type as last_message_type,
  lm.latest_msg_from_me as last_message_from_me
FROM chats c
LEFT JOIN last_messages lm ON c.id = lm.chat_id;

-- 3. Comentário explicativo
COMMENT ON VIEW chat_last_message_view IS 'View que combina chats com sua última mensagem em tempo real. Use esta view no frontend ao invés da tabela chats quando precisar exibir a última mensagem.';