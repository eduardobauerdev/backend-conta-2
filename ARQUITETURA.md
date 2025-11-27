# Arquitetura do Projeto

## Modo Híbrido: v0 Preview + Produção Real

Este projeto funciona em **dois modos**:

### 1. Modo DEMO (v0 Preview)
- **Quando**: Servidor WhatsApp não configurado
- **Como detecta**: Verifica se `whatsapp_config.server_url` está vazio
- **Dados**: Usa `lib/whatsapp-demo-data.ts` com conversas fictícias
- **Preview**: ✅ Funciona perfeitamente no v0
- **Ideal para**: Desenvolvimento, demonstrações, testes de UI

### 2. Modo PRODUÇÃO (WhatsApp Real)
- **Quando**: Admin configura URL do servidor em `/ajustes`
- **Como ativa**: Salva URL do Railway no banco Supabase
- **Dados**: Conecta ao servidor Express via API
- **Preview**: Requer deploy (Vercel + Railway)
- **Ideal para**: Uso real com clientes

---

## Estrutura de Pastas

\`\`\`
/app                    → Next.js (funciona no v0)
  /api/whatsapp        → API Routes com fallback para demo
  /(app)/whatsapp      → Interface do chat
  
/whatsapp-server       → Express.js (deploy separado no Railway)
  server.js            → Servidor WhatsApp independente
  
/lib
  whatsapp-demo-data.ts → Dados fictícios para preview
\`\`\`

---

## Como Funciona

### No v0 (Modo Demo)
\`\`\`
Usuário → Next.js → Verifica config → Sem URL? → Retorna dados demo
\`\`\`

### Em Produção (Modo Real)
\`\`\`
Usuário → Next.js → Verifica config → Com URL? → Chama Railway → WhatsApp Real
\`\`\`

---

## Deploy

### 1. Next.js (Aplicação Principal)
- **Onde**: Vercel (via botão "Publish" no v0)
- **O que faz**: Interface do usuário
- **Configuração**: Conectar Supabase nas variáveis de ambiente

### 2. Express Server (Servidor WhatsApp)
- **Onde**: Railway
- **O que faz**: Mantém conexão com WhatsApp Web
- **Configuração**: Ver `DEPLOY_RAILWAY.md`

### 3. Conectar os dois
- Após deploy do Railway, copie a URL gerada
- Acesse `/ajustes` na aplicação Next.js
- Cole a URL do Railway na seção WhatsApp
- Pronto! Agora está em modo produção

---

## Vantagens Desta Arquitetura

✅ **Preview funciona no v0** sem Express  
✅ **Desenvolvimento rápido** com dados demo  
✅ **Produção robusta** com servidor dedicado  
✅ **Escalável** - servidores independentes  
✅ **Flexível** - pode trocar Railway por outro host
