# 🔄 Migração: Banco de Dados → WhatsApp Baileys em Tempo Real

## 📋 Resumo da Mudança

**ANTES:** Servidor fraco salvava tudo no Supabase  
**DEPOIS:** Servidor potente (12GB RAM, 6 CPU) mantém dados em memória e streaming em tempo real

---

## 🏗️ Nova Arquitetura

```
┌─────────────────────────────────────────────────┐
│  Backend (Node.js + Baileys)                    │
│  ├── WhatsApp Web Baileys                       │
│  ├── Session em memória                         │
│  ├── Mensagens/Chats em cache (RAM)            │
│  └── WebSocket para tempo real                  │
└──────────────────┬──────────────────────────────┘
                   │
                   │ WebSocket/SSE
                   │
┌──────────────────▼──────────────────────────────┐
│  Frontend (Next.js)                              │
│  ├── Recebe eventos em tempo real               │
│  ├── Cache local (React State/SWR)              │
│  └── Atualiza UI instantaneamente               │
└──────────────────┬──────────────────────────────┘
                   │
                   │ Apenas para persistência
                   │
┌──────────────────▼──────────────────────────────┐
│  Supabase (Dados Persistentes)                  │
│  ├── Metadados de chats (etiquetas, notas)     │
│  ├── Assignments (quem atende cada chat)        │
│  ├── Configurações                              │
│  └── NÃO MAIS: mensagens e chats completos     │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Mudanças no Frontend

### 1️⃣ **Contexto WhatsApp** (CRÍTICO)

**Arquivo:** `contexts/whatsapp-context.tsx`

**Mudança:** Adicionar suporte a WebSocket

```typescript
// ANTES: Apenas polling HTTP
useEffect(() => {
  const interval = setInterval(checkStatus, 30000)
  return () => clearInterval(interval)
}, [])

// DEPOIS: WebSocket para tempo real
useEffect(() => {
  const ws = new WebSocket(process.env.NEXT_PUBLIC_BACKEND_WS_URL)
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'connection_status') {
      setIsConnected(data.connected)
    }
  }
  
  return () => ws.close()
}, [])
```

---

### 2️⃣ **API Routes** (SIMPLIFICAR)

**Arquivos afetados:**
- `app/api/whatsapp/chats/route.ts`
- `app/api/whatsapp/messages/[chatId]/route.ts`
- `app/api/whatsapp/send/route.ts`

**Mudança:** Proxy direto para o backend (sem cache no Supabase)

```typescript
// ANTES: Buscava do Supabase
const { data } = await supabase
  .from('whatsapp_chats')
  .select('*')

// DEPOIS: Proxy direto para Baileys backend
const response = await fetch(`${BACKEND_URL}/chats`, {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

---

### 3️⃣ **Componentes WhatsApp** (TEMPO REAL)

#### `components/whatsapp/chat-list.tsx`

```typescript
// ADICIONAR: Listener WebSocket
useEffect(() => {
  const ws = new WebSocket(WS_URL)
  
  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data)
    
    switch(type) {
      case 'new_message':
        // Atualizar lista de chats
        setChats(prev => updateChatWithNewMessage(prev, data))
        break
      case 'new_chat':
        // Adicionar novo chat
        setChats(prev => [data, ...prev])
        break
      case 'message_ack':
        // Atualizar status de mensagem
        updateMessageStatus(data.messageId, data.ack)
        break
    }
  }
  
  return () => ws.close()
}, [])
```

#### `components/whatsapp/chat-window.tsx`

```typescript
// ANTES: SWR busca do banco de dados via API
const { data: messages } = useSWR(
  `/api/whatsapp/messages/${chatId}`,
  fetcher,
  { refreshInterval: 5000 } // Polling a cada 5s
)

// DEPOIS: WebSocket tempo real
useEffect(() => {
  const ws = new WebSocket(`${WS_URL}/chat/${chatId}`)
  
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    setMessages(prev => [...prev, message])
  }
  
  return () => ws.close()
}, [chatId])
```

---

### 4️⃣ **Cache Local** (NOVO)

**Criar:** `lib/whatsapp-local-cache.ts`

```typescript
// Cache em memória no frontend
class WhatsAppCache {
  private chats: Map<string, Chat> = new Map()
  private messages: Map<string, Message[]> = new Map()
  
  updateChat(chat: Chat) {
    this.chats.set(chat.id, chat)
  }
  
  addMessage(chatId: string, message: Message) {
    const messages = this.messages.get(chatId) || []
    this.messages.set(chatId, [...messages, message])
  }
  
  // ... mais métodos
}

export const cache = new WhatsAppCache()
```

---

### 5️⃣ **Supabase Realtime** (MANTER APENAS PARA METADADOS)

**Arquivo:** `contexts/whatsapp-cache-context.tsx`

**Mudança:** Remover subscriptions de mensagens, manter apenas metadados

```typescript
// MANTER: Assignments, etiquetas, notas
const assignmentsChannel = supabase
  .channel('assignments')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'chat_assignments' 
  }, handleAssignmentChange)
  .subscribe()

// REMOVER: Mensagens (agora vem via WebSocket)
// const messagesChannel = supabase
//   .channel('messages')
//   .on(...) ❌ NÃO MAIS NECESSÁRIO
```

---

## 🎯 Funcionalidades que Mudam

### ✅ Continuam Usando Supabase:
- ✅ Assignments (quem atende cada chat)
- ✅ Etiquetas/Tags
- ✅ Notas dos chats
- ✅ Configurações
- ✅ Usuários e permissões
- ✅ Quick Replies
- ✅ Logs de atividade

### 🔄 Migram para Backend Baileys:
- 🔄 Lista de chats
- 🔄 Mensagens
- 🔄 Envio de mensagens
- 🔄 Status de conexão
- 🔄 QR Code
- 🔄 Contatos
- 🔄 Profile pictures

---

## 📦 Dependências a Adicionar no Frontend

```json
{
  "dependencies": {
    "socket.io-client": "^4.7.2", // Para WebSocket
    "zustand": "^4.5.0"           // Para state management (opcional)
  }
}
```

---

## 🚀 Ordem de Implementação

### Fase 1: Infraestrutura (Backend)
1. ✅ Criar repositório backend separado
2. ✅ Configurar Baileys
3. ✅ Implementar WebSocket server
4. ✅ Criar endpoints REST básicos

### Fase 2: Conexão (Frontend)
5. ⬜ Atualizar WhatsAppContext com WebSocket
6. ⬜ Criar hook `useWhatsAppSocket`
7. ⬜ Atualizar variáveis de ambiente

### Fase 3: Componentes (Frontend)
8. ⬜ Migrar chat-list para WebSocket
9. ⬜ Migrar chat-window para WebSocket
10. ⬜ Atualizar envio de mensagens

### Fase 4: Cleanup
11. ⬜ Remover código antigo do Supabase
12. ⬜ Limpar tabelas não utilizadas
13. ⬜ Atualizar documentação

---

## 🔐 Variáveis de Ambiente

**Adicionar em `.env.local`:**

```bash
# Backend WebSocket
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
NEXT_PUBLIC_BACKEND_WS_URL=wss://seu-backend.railway.app

# Auth (se usar autenticação)
BACKEND_AUTH_TOKEN=seu-token-secreto
```

---

## 📊 Benefícios da Nova Arquitetura

### ⚡ Performance
- ✅ Mensagens em tempo real (sem delay)
- ✅ Sem polling desnecessário
- ✅ Cache em memória (muito mais rápido)
- ✅ Menor carga no banco de dados

### 💰 Custo
- ✅ Menos queries no Supabase
- ✅ Menos storage usado
- ✅ Melhor uso dos recursos do servidor

### 🛠️ Manutenção
- ✅ Código mais simples
- ✅ Separação clara de responsabilidades
- ✅ Mais fácil de escalar

---

## ⚠️ Pontos de Atenção

### 1. Persistência de Mensagens
**Decisão:** Você quer salvar mensagens no banco para histórico?

**Opção A:** Não salvar (tudo em RAM)
- ✅ Mais rápido
- ❌ Perde histórico ao reiniciar

**Opção B:** Salvar async (background)
- ✅ Mantém histórico
- ❌ Mais complexo

### 2. Reconexão
Implementar lógica de reconexão automática do WebSocket

### 3. Fallback
Manter HTTP polling como fallback se WebSocket falhar

---

## 📝 Próximos Passos

Quer que eu:

1. **Crie o projeto backend** completo com Baileys + WebSocket?
2. **Atualize o frontend** para usar WebSocket?
3. **Crie hooks customizados** para gerenciar a conexão?
4. **Faça tudo junto** (backend + frontend)?

Me diga o que prefere e vou começar! 🚀
