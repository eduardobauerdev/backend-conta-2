# 📘 Especificação Completa do Backend WhatsApp Baileys

> **Para:** Repositório Backend (separado)  
> **Servidor:** 12GB RAM, 6 CPU  
> **Stack:** Node.js + Baileys + WebSocket + LibreOffice

---

## 🎯 Objetivo

Criar um backend Node.js que:
1. Mantém conexão com WhatsApp Web usando Baileys
2. Armazena chats e mensagens **em memória (RAM)**
3. Envia eventos em **tempo real via WebSocket** para o frontend
4. Expõe **API REST** para operações síncronas
5. Gera documentos com **LibreOffice** (futuro)

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────┐
│  Backend (Node.js + Baileys)                    │
│                                                  │
│  ├── WhatsApp Baileys                           │
│  │   ├── Connection Manager                     │
│  │   ├── Message Handler                        │
│  │   └── Event Emitter                          │
│  │                                               │
│  ├── Cache em Memória                           │
│  │   ├── Map<chatId, Chat>                      │
│  │   └── Map<chatId, Message[]>                 │
│  │                                               │
│  ├── WebSocket Server                           │
│  │   ├── Broadcasts eventos em tempo real       │
│  │   └── Gerencia conexões de clientes          │
│  │                                               │
│  ├── REST API                                    │
│  │   ├── GET /api/chats                         │
│  │   ├── GET /api/chats/:id/messages            │
│  │   ├── POST /api/chats/send                   │
│  │   └── GET /api/status                        │
│  │                                               │
│  └── LibreOffice Handler (futuro)               │
│      └── Geração de documentos                  │
└─────────────────────────────────────────────────┘
```

---

## 📡 WebSocket - Eventos em Tempo Real

### Conexão

**URL:** `ws://localhost:3001` (ou `wss://` em produção)

### Eventos Enviados pelo Backend

O backend envia eventos no formato:

```typescript
interface SocketEvent {
  type: string
  data: any
}
```

#### 1️⃣ `connection_status` - Status da conexão WhatsApp

```json
{
  "type": "connection_status",
  "data": {
    "connected": true,
    "phoneNumber": "5511999999999"
  }
}
```

**Quando enviar:**
- Quando o WhatsApp conectar/desconectar
- Quando um cliente WebSocket conectar (enviar status atual)

---

#### 2️⃣ `new_message` - Nova mensagem recebida

```json
{
  "type": "new_message",
  "data": {
    "id": {
      "_serialized": "false_5511999999999@c.us_3EB0XXXXX",
      "id": "3EB0XXXXX",
      "fromMe": false,
      "remote": "5511999999999@c.us"
    },
    "from": "5511999999999@c.us",
    "to": "5511888888888@c.us",
    "body": "Olá, tudo bem?",
    "timestamp": 1734451200,
    "fromMe": false,
    "hasMedia": false,
    "type": "chat",
    "ack": 1
  }
}
```

**Quando enviar:**
- Toda vez que uma nova mensagem chegar
- Toda vez que você enviar uma mensagem

---

#### 3️⃣ `message_ack` - Status de envio da mensagem

```json
{
  "type": "message_ack",
  "data": {
    "messageId": "false_5511999999999@c.us_3EB0XXXXX",
    "ack": 3,
    "chat": "5511999999999@c.us"
  }
}
```

**ACK Levels:**
- `0` = Error/Not sent
- `1` = Pending (clock icon)
- `2` = Server received (single check)
- `3` = Delivered (double check)
- `4` = Read (blue check)
- `5` = Played (for audio messages)

---

#### 4️⃣ `new_chat` - Novo chat criado

```json
{
  "type": "new_chat",
  "data": {
    "id": {
      "_serialized": "5511999999999@c.us",
      "server": "c.us",
      "user": "5511999999999"
    },
    "name": "João Silva",
    "isGroup": false,
    "unreadCount": 1,
    "timestamp": 1734451200,
    "archived": false
  }
}
```

---

#### 5️⃣ `chat_update` - Chat atualizado

```json
{
  "type": "chat_update",
  "data": {
    "id": "5511999999999@c.us",
    "unreadCount": 0,
    "archived": false,
    "lastMessage": {
      "body": "Última mensagem",
      "timestamp": 1734451200,
      "fromMe": true
    }
  }
}
```

---

#### 6️⃣ `typing` - Indicador de digitação

```json
{
  "type": "typing",
  "data": {
    "chatId": "5511999999999@c.us",
    "isTyping": true,
    "participant": "5511999999999"
  }
}
```

---

#### 7️⃣ `presence_update` - Status online/offline

```json
{
  "type": "presence_update",
  "data": {
    "chatId": "5511999999999@c.us",
    "state": "available"
  }
}
```

**States:** `available`, `unavailable`, `composing`, `recording`

---

## 🌐 REST API - Endpoints

### Base URL

- **Desenvolvimento:** `http://localhost:3001`
- **Produção:** `https://seu-servidor.com`

---

### 1️⃣ **GET** `/api/status`

**Descrição:** Retorna o status da conexão WhatsApp

**Response:**

```json
{
  "success": true,
  "connected": true,
  "phoneNumber": "5511888888888",
  "uptime": 3600,
  "memory": {
    "chats": 150,
    "messages": 5000
  }
}
```

---

### 2️⃣ **GET** `/api/chats`

**Descrição:** Lista todos os chats

**Query Parameters:**
- `limit` (opcional): Número de chats por página (padrão: 50)
- `offset` (opcional): Offset para paginação (padrão: 0)

**Response:**

```json
{
  "success": true,
  "chats": [
    {
      "id": {
        "_serialized": "5511999999999@c.us",
        "server": "c.us",
        "user": "5511999999999"
      },
      "name": "João Silva",
      "isGroup": false,
      "unreadCount": 2,
      "timestamp": 1734451200,
      "archived": false,
      "pinned": false,
      "lastMessage": {
        "body": "Olá!",
        "timestamp": 1734451200,
        "fromMe": false
      }
    }
  ],
  "total": 150,
  "hasMore": true
}
```

---

### 3️⃣ **GET** `/api/chats/:chatId/messages`

**Descrição:** Busca mensagens de um chat

**Path Parameters:**
- `chatId`: ID do chat (ex: `5511999999999@c.us`)

**Query Parameters:**
- `limit` (opcional): Número de mensagens (padrão: 50)
- `offset` (opcional): Offset para paginação (padrão: 0)

**Response:**

```json
{
  "success": true,
  "messages": [
    {
      "id": {
        "_serialized": "false_5511999999999@c.us_3EB0XXXXX",
        "id": "3EB0XXXXX",
        "fromMe": false,
        "remote": "5511999999999@c.us"
      },
      "from": "5511999999999@c.us",
      "to": "5511888888888@c.us",
      "body": "Olá, tudo bem?",
      "timestamp": 1734451200,
      "fromMe": false,
      "hasMedia": false,
      "type": "chat",
      "ack": 3
    }
  ],
  "total": 100,
  "hasMore": false
}
```

---

### 4️⃣ **POST** `/api/chats/send`

**Descrição:** Envia uma mensagem

**Body:**

```json
{
  "chatId": "5511999999999@c.us",
  "message": "Olá! Como posso ajudar?"
}
```

**Response:**

```json
{
  "success": true,
  "message": {
    "id": {
      "_serialized": "true_5511999999999@c.us_3EB0XXXXX"
    },
    "ack": 1,
    "timestamp": 1734451200
  }
}
```

---

### 5️⃣ **GET** `/api/qr`

**Descrição:** Obtém o QR Code para autenticação

**Response:**

```json
{
  "success": true,
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

**Quando retornar:**
- Se WhatsApp **não estiver** autenticado

**Se já autenticado:**

```json
{
  "success": false,
  "message": "WhatsApp já está conectado",
  "connected": true
}
```

---

### 6️⃣ **POST** `/api/logout`

**Descrição:** Desconecta o WhatsApp

**Response:**

```json
{
  "success": true,
  "message": "Desconectado com sucesso"
}
```

---

### 7️⃣ **GET** `/api/chats/:chatId`

**Descrição:** Obtém informações de um chat específico

**Response:**

```json
{
  "success": true,
  "chat": {
    "id": {
      "_serialized": "5511999999999@c.us"
    },
    "name": "João Silva",
    "isGroup": false,
    "unreadCount": 0,
    "timestamp": 1734451200
  }
}
```

---

## 💾 Estrutura de Dados

### Chat Object

```typescript
interface Chat {
  id: {
    _serialized: string  // "5511999999999@c.us"
    server: string        // "c.us" ou "g.us"
    user: string          // "5511999999999"
  }
  name: string
  isGroup: boolean
  unreadCount: number
  timestamp: number
  archived: boolean
  pinned: boolean
  lastMessage?: {
    body: string
    timestamp: number
    fromMe: boolean
  }
}
```

### Message Object

```typescript
interface Message {
  id: {
    _serialized: string
    id: string
    fromMe: boolean
    remote: string
  }
  from: string
  to: string
  body: string
  timestamp: number
  fromMe: boolean
  hasMedia: boolean
  type: "chat" | "image" | "video" | "audio" | "document" | "sticker"
  ack: number  // 0-5
  mediaUrl?: string
  mimetype?: string
  filename?: string
}
```

---

## 🔧 Implementação Sugerida

### Stack Tecnológico

```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "^6.7.0",
    "express": "^4.18.2",
    "ws": "^8.16.0",
    "qrcode": "^1.5.3",
    "pino": "^8.19.0",
    "dotenv": "^16.4.0"
  }
}
```

---

### Estrutura de Pastas

```
backend-whatsapp/
├── src/
│   ├── index.ts                 # Entry point
│   ├── whatsapp/
│   │   ├── client.ts            # Baileys client
│   │   ├── handlers.ts          # Event handlers
│   │   └── cache.ts             # In-memory cache
│   ├── websocket/
│   │   ├── server.ts            # WebSocket server
│   │   └── events.ts            # Event emitters
│   ├── api/
│   │   ├── routes.ts            # REST routes
│   │   └── controllers.ts       # Controllers
│   └── libreoffice/             # (Futuro)
│       └── generator.ts
├── .env
├── package.json
└── tsconfig.json
```

---

### Exemplo: Cache em Memória

```typescript
// src/whatsapp/cache.ts
import type { Chat, Message } from './types'

class WhatsAppCache {
  private chats: Map<string, Chat> = new Map()
  private messages: Map<string, Message[]> = new Map()

  // Chats
  setChat(chat: Chat) {
    this.chats.set(chat.id._serialized, chat)
  }

  getChat(chatId: string): Chat | undefined {
    return this.chats.get(chatId)
  }

  getAllChats(): Chat[] {
    return Array.from(this.chats.values())
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  // Messages
  addMessage(chatId: string, message: Message) {
    if (!this.messages.has(chatId)) {
      this.messages.set(chatId, [])
    }
    this.messages.get(chatId)!.push(message)
  }

  getMessages(chatId: string): Message[] {
    return this.messages.get(chatId) || []
  }

  // Stats
  getStats() {
    let totalMessages = 0
    this.messages.forEach(msgs => totalMessages += msgs.length)
    
    return {
      chats: this.chats.size,
      messages: totalMessages
    }
  }
}

export const cache = new WhatsAppCache()
```

---

### Exemplo: WebSocket Server

```typescript
// src/websocket/server.ts
import { WebSocketServer } from 'ws'
import type { SocketEvent } from './types'

export class WhatsAppWebSocket {
  private wss: WebSocketServer
  private clients: Set<WebSocket> = new Set()

  constructor(port: number) {
    this.wss = new WebSocketServer({ port })
    
    this.wss.on('connection', (ws) => {
      console.log('Cliente WebSocket conectado')
      this.clients.add(ws)

      // Enviar status atual
      this.sendToClient(ws, {
        type: 'connection_status',
        data: { connected: true }
      })

      ws.on('close', () => {
        this.clients.delete(ws)
        console.log('Cliente WebSocket desconectado')
      })
    })
  }

  // Broadcast para todos os clientes
  broadcast(event: SocketEvent) {
    const message = JSON.stringify(event)
    
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  }

  // Enviar para um cliente específico
  sendToClient(client: WebSocket, event: SocketEvent) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(event))
    }
  }
}

export const wsServer = new WhatsAppWebSocket(3001)
```

---

### Exemplo: Baileys Client

```typescript
// src/whatsapp/client.ts
import makeWASocket, { 
  DisconnectReason, 
  useMultiFileAuthState 
} from '@whiskeysockets/baileys'
import { cache } from './cache'
import { wsServer } from '../websocket/server'

export class WhatsAppClient {
  private sock: any

  async initialize() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info')

    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: true
    })

    // Salvar credenciais
    this.sock.ev.on('creds.update', saveCreds)

    // Mensagens
    this.sock.ev.on('messages.upsert', async ({ messages }) => {
      for (const msg of messages) {
        const chatId = msg.key.remoteJid
        
        // Adicionar ao cache
        cache.addMessage(chatId, msg)

        // Broadcast via WebSocket
        wsServer.broadcast({
          type: 'new_message',
          data: msg
        })
      }
    })

    // Status de conexão
    this.sock.ev.on('connection.update', (update) => {
      const { connection, qr } = update

      if (qr) {
        console.log('QR Code gerado')
      }

      if (connection === 'open') {
        console.log('WhatsApp conectado!')
        
        wsServer.broadcast({
          type: 'connection_status',
          data: { connected: true }
        })
      }
    })

    // Carregar chats iniciais
    await this.loadChats()
  }

  async loadChats() {
    const chats = await this.sock.getChats()
    chats.forEach(chat => cache.setChat(chat))
  }

  async sendMessage(chatId: string, text: string) {
    return await this.sock.sendMessage(chatId, { text })
  }
}

export const whatsappClient = new WhatsAppClient()
```

---

## 🚀 Como Rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```.env
PORT=3001
NODE_ENV=development
```

### 3. Iniciar servidor

```bash
npm run dev
```

### 4. Conectar WhatsApp

1. Acesse `http://localhost:3001/api/qr`
2. Escaneie o QR Code com o WhatsApp
3. Aguarde a conexão

---

## ⚠️ Pontos de Atenção

### 1. Persistência de Sessão

- Baileys salva a sessão em `auth_info/`
- **Não commitar** essa pasta no Git
- Backup regular recomendado

### 2. Memória

- Com 12GB RAM, pode armazenar ~10.000 chats
- Implementar limite de mensagens por chat (ex: últimas 100)

### 3. Reconexão

- Baileys reconecta automaticamente
- Implementar retry logic robusto

### 4. Rate Limiting

- WhatsApp tem limites de envio
- Implementar queue para mensagens

---

## 📊 Testes

### Testar WebSocket

```javascript
const ws = new WebSocket('ws://localhost:3001')

ws.onmessage = (event) => {
  console.log('Evento recebido:', JSON.parse(event.data))
}
```

### Testar REST API

```bash
# Status
curl http://localhost:3001/api/status

# Chats
curl http://localhost:3001/api/chats

# Mensagens
curl http://localhost:3001/api/chats/5511999999999@c.us/messages

# Enviar
curl -X POST http://localhost:3001/api/chats/send \
  -H "Content-Type: application/json" \
  -d '{"chatId":"5511999999999@c.us","message":"Olá!"}'
```

---

## 🔮 Futuro: LibreOffice

### Endpoint Sugerido

**POST** `/api/documents/generate`

```json
{
  "template": "contrato.docx",
  "data": {
    "nomeCliente": "João Silva",
    "valor": "R$ 1.000,00"
  },
  "format": "pdf"
}
```

**Response:**

```json
{
  "success": true,
  "documentUrl": "https://backend.com/documents/contrato-123.pdf"
}
```

---

## � Compatibilidade com Frontend - Campos Esperados

O frontend foi atualizado para buscar dados diretamente do backend Baileys. Abaixo estão os campos esperados nas respostas:

### Resposta de GET /api/chats

```json
{
  "success": true,
  "chats": [
    {
      "id": "5511999999999@c.us",
      "uuid": "uuid-opcional",
      "name": "João Silva",
      "pushName": "João",
      "phone": "5511999999999",
      "lastMessage": "Olá!",
      "lastMessageTime": 1734451200000,
      "unreadCount": 2,
      "pictureUrl": "https://...",
      "image_url": "https://...",
      "etiqueta_ids": []
    }
  ],
  "total": 150
}
```

**Campos aceitos pelo frontend (usa o primeiro disponível):**
- `name` ou `pushName` → Nome do contato
- `lastMessage` ou `last_message` → Última mensagem
- `lastMessageTime` ou `last_message_time` → Timestamp
- `unreadCount` ou `unread_count` → Mensagens não lidas
- `pictureUrl` ou `image_url` → Foto do contato

### Resposta de GET /api/chats/:chatId/messages

```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_123",
      "body": "Conteúdo da mensagem",
      "content": "Conteúdo alternativo",
      "timestamp": 1734451200000,
      "from": "5511999999999@c.us",
      "to": "5511888888888@c.us",
      "fromMe": false,
      "type": "chat",
      "hasMedia": false,
      "ack": 3,
      "mediaUrl": null,
      "mimeType": null,
      "caption": null
    }
  ],
  "total": 100
}
```

**Campos aceitos pelo frontend:**
- `body` ou `content` → Conteúdo da mensagem
- `fromMe` ou `from_me` → Se é mensagem enviada
- `hasMedia` ou `has_media` → Se tem mídia

---

## �📝 Checklist de Implementação

- [ ] Configurar Baileys
- [ ] Implementar cache em memória
- [ ] Criar WebSocket server
- [ ] Implementar REST API
- [ ] Testar envio/recebimento de mensagens
- [ ] Implementar QR Code
- [ ] Implementar reconexão automática
- [ ] Deploy no servidor
- [ ] Configurar HTTPS/WSS
- [ ] Integrar com frontend

---

## 🤝 Integração com Frontend

O frontend já está **100% pronto** e espera:

✅ WebSocket em `ws://localhost:3001`  
✅ REST API em `http://localhost:3001/api`  
✅ Eventos no formato especificado acima

**Variáveis no frontend (.env.local):**
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_BACKEND_WS_URL=ws://localhost:3001
```

---

## 📞 Suporte

Qualquer dúvida sobre a especificação, consulte este documento ou o código do frontend em:

- `hooks/use-whatsapp-socket.ts`
- `contexts/whatsapp-context.tsx`
- `lib/whatsapp-cache.ts`

---

**Boa sorte com a implementação! 🚀**
