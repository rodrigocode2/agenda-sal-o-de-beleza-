# 🚀 Guia de Deploy - HairConcept

## Deploy Rápido (Recomendado: Vercel)

### Opção 1: Deploy via Vercel (2 minutos)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Fazer deploy
cd /workspaces/agenda-sal-o-de-beleza-
vercel

# 4. Durante o deploy, responda:
# - Link to existing project? → NO
# - What's your project's name? → agenda-sal-o-de-beleza
# - In which directory is your code located? → ./
```

Seu site estará em: `https://agenda-sal-o-de-beleza.vercel.app`

### Opção 2: Deploy com Backend no Vercel

Se você quiser usar o backend também:

```bash
# 1. Criar arquivo vercel.json na raiz
```

Criar arquivo `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend-server.example.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend-server.example.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Opção 3: GitHub Pages (Gratuito, sem backend)

```bash
cd /workspaces/agenda-sal-o-de-beleza-

# Já está configurado! Vá para:
# GitHub → Settings → Pages → Source: main branch

# Seu site estará em:
# https://rodrigocode2.github.io/agenda-sal-o-de-beleza-
```

---

## ✅ Checklist de Configuração

Antes de publicar, configure:

- [ ] **Firebase**: Adicione credenciais em `index.html`
- [ ] **Stripe**: Adicione chave publicável
- [ ] **Backend**: Copie `backend-server.example.js` → `server.js` e configure `.env`
- [ ] **Teste**: Acesse o site e tente o fluxo de login/pagamento
- [ ] **Domínio Customizado**: (Opcional) Configure domínio no Vercel

---

## 🧪 Testando Localmente

```bash
# 1. Instalar dependências do backend
cd backend
npm install

# 2. Criar arquivo .env com suas credenciais
cp .env.example .env
# Editar .env com valores reais

# 3. Rodar servidor
npm run dev

# 4. Em outra aba, abrir index.html
# Usar http://localhost:3000 ou abrir index.html direto no navegador
```

---

## 📊 Monitorar Sua Receita

### No Dashboard Stripe
1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com)
2. Vá para "Payments" para ver transações
3. Em "Customers" você vê clientes e assinaturas
4. Em "Reports" você tem relatórios de receita

### No Firebase Console
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Selecione seu projeto
3. Em "Firestore Database" você vê dados dos usuários
4. Em "Authentication" você vê contas criadas

---

## 🔐 Configuração de Produção

### Variáveis de Ambiente Vercel

```bash
vercel env add STRIPE_SECRET_KEY
vercel env add FIREBASE_API_KEY
vercel env add FIREBASE_PROJECT_ID
# ... adicionar outras variáveis
```

### Restricões de Segurança Firebase

No Console Firebase → Authentication → Settings:

1. Vá para "Security Rules"
2. Configure para aceitar apenas seu domínio
3. Exemplo:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

---

## 💰 Começar a Ganhar

### 1. Seu Site está Pronto
✅ Design profissional  
✅ Autenticação  
✅ Sistema de pagamento integrado  

### 2. Promover
- Instagram: Poste sobre seu site de agendamento
- Facebook: Crie anúncios pagos
- WhatsApp: Compartilhe o link com clientes
- Google Ads: Anuncie para salões

### 3. Precificar
- **R$ 19,99/mês** é um preço competitivo
- Considere oferecer:
  - Teste grátis de 7 dias
  - Desconto anual (2 meses grátis)
  - Plano Enterprise customizado

### 4. Atender Clientes
- Responda emails rapidamente
- Ofereça suporte pelo WhatsApp
- Crie tutorial em vídeo
- Mostre casos de sucesso

---

## 🆘 Solução de Problemas

### Site em branco
- Abra DevTools (F12)
- Procure por erros no console
- Verifique se as credenciais Firebase estão corretas

### Pagamento não funciona
- Confira se a chave Stripe é válida
- Use cartão de teste: 4242 4242 4242 4242
- Verifique se o backend está respondendo

### Firebase não conecta
- Verifique apiKey e projectId
- Confira se o projeto existe em Firebase Console
- Tente criar novo projeto do zero

---

## 📞 Suporte Técnico

Dúvidas? Tente:
1. Documentação Firebase: [firebase.google.com/docs](https://firebase.google.com/docs)
2. Documentação Stripe: [stripe.com/docs](https://stripe.com/docs)
3. Fórum Vercel: [vercel.com/support](https://vercel.com/support)

---

**Parabéns! 🎉 Seu site está pronto para gerar receita!**

Próximos passos:
1. Configure as credenciais
2. Faça deploy no Vercel
3. Teste com pagamento fictício
4. Promova seu site
5. Comece a receber pagamentos

Boa sorte! 💰
