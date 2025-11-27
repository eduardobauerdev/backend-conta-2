# 🚀 Configuração do Servidor WhatsApp (Repositório Separado)

O servidor Express.js do WhatsApp **deve estar em um repositório separado** para permitir o preview no v0.

## 📦 Estrutura Recomendada

\`\`\`
/seu-projeto-principal (Next.js) ← Este repositório (v0)
/whatsapp-server (Express.js)    ← Repositório separado (Railway)
\`\`\`

## 🔧 Criar o Repositório do Servidor

### 1. Crie uma nova pasta local

\`\`\`bash
mkdir whatsapp-server
cd whatsapp-server
\`\`\`

### 2. Crie os arquivos necessários

**package.json**
\`\`\`json
{
  "name": "whatsapp-server",
  "version": "1.0.0",
  "description": "Servidor WhatsApp Web para integração",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "whatsapp-web.js": "^1.23.0",
    "qrcode": "^1.5.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
\`\`\`

**server.js**
\`\`\`javascript
const express = require('express');
const cors = require('cors');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Cliente WhatsApp
let client;
let qrCodeData = null;
let isReady = false;

// Inicializar cliente
function initializeClient() {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  client.on('qr', async (qr) => {
    console.log('QR Code recebido');
    qrCodeData = await qrcode.toDataURL(qr);
  });

  client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
    isReady = true;
    qrCodeData = null;
  });

  client.on('authenticated', () => {
    console.log('Autenticado com sucesso!');
  });

  client.on('auth_failure', () => {
    console.log('Falha na autenticação');
    isReady = false;
  });

  client.on('disconnected', () => {
    console.log('Cliente desconectado');
    isReady = false;
    qrCodeData = null;
  });

  client.initialize();
}

// Rotas da API
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/status', (req, res) => {
  res.json({
    connected: isReady,
    hasQR: !!qrCodeData,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/qr', (req, res) => {
  if (qrCodeData) {
    res.json({ qr: qrCodeData });
  } else if (isReady) {
    res.json({ message: 'Já conectado' });
  } else {
    res.status(404).json({ error: 'QR Code não disponível' });
  }
});

app.get('/api/chats', async (req, res) => {
  if (!isReady) {
    return res.status(503).json({ error: 'WhatsApp não conectado' });
  }

  try {
    const chats = await client.getChats();
    const chatList = chats.slice(0, 50).map(chat => ({
      id: chat.id._serialized,
      name: chat.name,
      isGroup: chat.isGroup,
      unreadCount: chat.unreadCount,
      lastMessage: chat.lastMessage?.body || '',
      timestamp: chat.lastMessage?.timestamp || Date.now()
    }));

    res.json(chatList);
  } catch (error) {
    console.error('Erro ao buscar chats:', error);
    res.status(500).json({ error: 'Erro ao buscar chats' });
  }
});

app.get('/api/messages/:chatId', async (req, res) => {
  if (!isReady) {
    return res.status(503).json({ error: 'WhatsApp não conectado' });
  }

  try {
    const { chatId } = req.params;
    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 50 });

    const messageList = messages.map(msg => ({
      id: msg.id._serialized,
      body: msg.body,
      from: msg.from,
      to: msg.to,
      fromMe: msg.fromMe,
      timestamp: msg.timestamp,
      type: msg.type
    }));

    res.json(messageList);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

app.post('/api/send', async (req, res) => {
  if (!isReady) {
    return res.status(503).json({ error: 'WhatsApp não conectado' });
  }

  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      return res.status(400).json({ error: 'chatId e message são obrigatórios' });
    }

    await client.sendMessage(chatId, message);
    res.json({ success: true, message: 'Mensagem enviada' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  initializeClient();
});
\`\`\`

**Dockerfile**
\`\`\`dockerfile
FROM node:18-slim

# Instalar dependências do Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY package*.json ./
RUN npm install --production

COPY . .

# Configurar Puppeteer para usar Chromium instalado
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expor porta
EXPOSE 3001

# Iniciar servidor
CMD ["npm", "start"]
\`\`\`

**.dockerignore**
\`\`\`
node_modules
npm-debug.log
.git
.gitignore
README.md
.wwebjs_auth
.wwebjs_cache
\`\`\`

**.gitignore**
\`\`\`
node_modules
.wwebjs_auth
.wwebjs_cache
npm-debug.log
.env
\`\`\`

**README.md**
\`\`\`markdown
# WhatsApp Server

Servidor Express.js para integração com WhatsApp Web.

## Deploy no Railway

1. Crie um novo repositório no GitHub com estes arquivos
2. Acesse [Railway](https://railway.app)
3. "New Project" → "Deploy from GitHub repo"
4. Selecione este repositório
5. Railway detectará automaticamente o Dockerfile
6. Após o deploy, gere um domínio público
7. Configure a URL no seu app Next.js em `/ajustes`

## Desenvolvimento Local

\`\`\`bash
npm install
npm start
\`\`\`

Servidor rodará em `http://localhost:3001`
\`\`\`

### 3. Inicialize Git e faça push

\`\`\`bash
git init
git add .
git commit -m "Initial commit: WhatsApp server"
git remote add origin https://github.com/SEU_USUARIO/whatsapp-server.git
git push -u origin main
\`\`\`

### 4. Deploy no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Escolha o repositório **whatsapp-server**
5. Railway detectará o Dockerfile automaticamente
6. Após o deploy, vá em **Settings → Networking → Generate Domain**
7. Copie a URL gerada (ex: `https://whatsapp-server-production.up.railway.app`)

### 5. Configure no seu App Next.js

1. Acesse sua aplicação Next.js no v0 ou em produção
2. Vá para `/ajustes` (página de ajustes de admin)
3. Cole a URL do Railway na seção WhatsApp
4. Salve as configurações

## ✅ Pronto!

Agora você tem:
- ✅ Preview funcionando no v0 (sem Express)
- ✅ WhatsApp real funcionando em produção (com Express no Railway)
- ✅ Arquitetura limpa e separada

## 💡 Modo de Operação

**Sem servidor configurado**: App usa dados demo de `lib/whatsapp-demo-data.ts`
**Com servidor configurado**: App conecta ao Railway e usa WhatsApp real

## 🔗 Links Úteis

- [Railway Docs](https://docs.railway.app/)
- [whatsapp-web.js Docs](https://wwebjs.dev/)
