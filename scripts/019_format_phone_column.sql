-- Script para formatar automaticamente a coluna 'phone' da tabela 'chats'
-- Extrai o telefone do ID (5511999288733@s.whatsapp.net) e formata para +55 (11) 99928-8733
-- Se o ID contiver @lid, o telefone fica NULL

-- 1. Criar função para extrair e formatar telefone do chat_id
CREATE OR REPLACE FUNCTION format_phone_from_chat_id(chat_id TEXT)
RETURNS TEXT AS $$
DECLARE
  raw_phone TEXT;
  country_code TEXT;
  area_code TEXT;
  phone_number TEXT;
  formatted_phone TEXT;
BEGIN
  -- Se for um LID (Lead ID), retorna NULL
  IF chat_id LIKE '%@lid' THEN
    RETURN NULL;
  END IF;
  
  -- Extrai apenas os números antes do @
  raw_phone := split_part(chat_id, '@', 1);
  
  -- Remove qualquer caractere que não seja número
  raw_phone := regexp_replace(raw_phone, '[^0-9]', '', 'g');
  
  -- Se não tiver números suficientes, retorna o valor bruto
  IF length(raw_phone) < 10 THEN
    RETURN raw_phone;
  END IF;
  
  -- Formatação para números brasileiros (começam com 55 e têm 12-13 dígitos)
  IF raw_phone LIKE '55%' AND length(raw_phone) >= 12 THEN
    country_code := '55';
    area_code := substring(raw_phone FROM 3 FOR 2);
    phone_number := substring(raw_phone FROM 5);
    
    -- Formata o número (9 dígitos = celular, 8 dígitos = fixo)
    IF length(phone_number) = 9 THEN
      -- Celular: 99999-9999
      formatted_phone := '+' || country_code || ' (' || area_code || ') ' || 
                        substring(phone_number FROM 1 FOR 5) || '-' || 
                        substring(phone_number FROM 6 FOR 4);
    ELSIF length(phone_number) = 8 THEN
      -- Fixo: 9999-9999
      formatted_phone := '+' || country_code || ' (' || area_code || ') ' || 
                        substring(phone_number FROM 1 FOR 4) || '-' || 
                        substring(phone_number FROM 5 FOR 4);
    ELSE
      -- Formato genérico
      formatted_phone := '+' || country_code || ' (' || area_code || ') ' || phone_number;
    END IF;
    
    RETURN formatted_phone;
  END IF;
  
  -- Para outros países, retorna formato genérico com +
  IF length(raw_phone) >= 10 THEN
    country_code := substring(raw_phone FROM 1 FOR 2);
    RETURN '+' || country_code || ' ' || substring(raw_phone FROM 3);
  END IF;
  
  RETURN raw_phone;
END;
$$ LANGUAGE plpgsql IMMUTABLE;


-- 2. Atualizar todos os registros existentes que têm phone NULL ou vazio
UPDATE chats 
SET phone = format_phone_from_chat_id(id)
WHERE phone IS NULL OR phone = '';


-- 3. Criar trigger para formatar automaticamente novos registros
CREATE OR REPLACE FUNCTION trigger_format_phone_on_chat()
RETURNS TRIGGER AS $$
BEGIN
  -- Só formata se phone não foi explicitamente fornecido
  IF NEW.phone IS NULL OR NEW.phone = '' THEN
    NEW.phone := format_phone_from_chat_id(NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Remove trigger existente se houver
DROP TRIGGER IF EXISTS format_phone_trigger ON chats;

-- Cria o trigger
CREATE TRIGGER format_phone_trigger
  BEFORE INSERT OR UPDATE ON chats
  FOR EACH ROW
  EXECUTE FUNCTION trigger_format_phone_on_chat();


-- 4. (Opcional) View para verificar os resultados
-- SELECT id, name, phone, format_phone_from_chat_id(id) as phone_formatado FROM chats LIMIT 20;
