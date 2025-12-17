# ✅ Checklist: Conectar Frontend ao Backend

## 🔍 Erro Atual
```
{"success":false,"message":"Erro ao obter QR Code","error":"fetch failed"}
```

**Causa:** O frontend não consegue se conectar ao backend.

---

## 📋 Verificações Necessárias

### 1️⃣ **Backend está rodando?**

No terminal do backend, execute:
```bash
npm start
# ou
node src/index.js
```

**Deve aparecer algo como:**
```
✅ Servidor rodando na porta 3001
✅ WhatsApp Baileys inicializado
```

---

### 2️⃣ **Porta correta?**

Verifique em qual porta o backend está rodando.

**Se for porta diferente de 3001**, atualize o `.env.local`:

```bash
# .env.local (frontend)
NEXT_PUBLIC_BACKEND_URL=http://localhost:SUA_PORTA_AQUI
```

Exemplos:
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001  # Porta 3001
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000  # Porta 3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080  # Porta 8080
```

---

### 3️⃣ **Testar backend manualmente**

Abra o navegador ou use curl:

```bash
# Testar se o backend responde
curl http://localhost:3001/api/status

# Ou abra no navegador:
http://localhost:3001/api/status
```

**Resposta esperada:**
```json
{
  "success": true,
  "connected": false,
  "memory": { ... }
}
```

---

### 4️⃣ **CORS configurado no backend?**

O backend precisa aceitar requisições do frontend.

**No backend (Express), adicione:**

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // URL do seu frontend
  credentials: true
}));
```

---

### 5️⃣ **Reiniciar o frontend**

Depois de alterar o `.env.local`:

```bash
# No terminal do frontend
npm run dev
```

**IMPORTANTE:** Next.js precisa ser reiniciado para ler novas variáveis de ambiente!

---

## 🧪 Teste Passo a Passo

### Passo 1: Verifique o backend
```bash
# Terminal 1 - Backend
cd seu-backend
npm start

# Deve mostrar: "Servidor rodando na porta 3001"
```

### Passo 2: Teste o endpoint
```bash
# Abra no navegador
http://localhost:3001/api/status
```

### Passo 3: Verifique o .env.local
```bash
# frontend/.env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001  ✅
```

### Passo 4: Reinicie o frontend
```bash
# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Passo 5: Tente conectar novamente
- Abra o frontend no navegador
- Clique em "Conectar WhatsApp"
- Verifique o console do navegador (F12)

---

## 📊 Logs para Debug

**No console do navegador (F12), você deve ver:**

```
[QRScanner] Backend URL: http://localhost:3001
[QRScanner] Chamando API em: /api/whatsapp/qr
[QRScanner] Resposta: { success: true, qr: "data:image/..." }
```

**Se ver:**
```
❌ fetch failed → Backend não está rodando ou URL errada
❌ 404 Not Found → Endpoint /api/initialize ou /api/qr não existe
❌ CORS error → Backend precisa configurar CORS
```

---

## 🚀 Solução Rápida

**Problema mais comum:** Backend não está rodando na porta esperada.

**Solução:**
1. Abra o terminal do backend
2. Verifique qual porta está rodando
3. Atualize `NEXT_PUBLIC_BACKEND_URL` no frontend
4. Reinicie o frontend (`npm run dev`)

---

## 💡 URLs de Exemplo

```bash
# Desenvolvimento local
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Backend em outro servidor local
NEXT_PUBLIC_BACKEND_URL=http://192.168.1.100:3001

# Backend em produção (Railway, por exemplo)
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
```

---

## ❓ Ainda não funciona?

Execute estes comandos e me envie a saída:

```bash
# 1. Verifique se o backend está rodando
curl http://localhost:3001/api/status

# 2. Verifique a variável de ambiente no frontend
# No código, adicione um console.log:
console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL)
```

**Me envie:**
1. A porta que o backend está rodando
2. A resposta do `curl http://localhost:3001/api/status`
3. O que aparece no console do navegador
