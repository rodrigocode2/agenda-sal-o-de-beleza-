# 🚀 Guia de Configuração - HairConcept com Cobrança

Parabéns! Seu site está pronto para monetização. Siga este guia para ativar os pagamentos.

## 📋 O que você precisa fazer:

### 1️⃣ Configurar Firebase (Autenticação & Banco de Dados)

**Passo 1: Criar conta no Firebase**
- Acesse [firebase.google.com](https://firebase.google.com)
- Clique em "Ir para o console"
- Faça login com sua conta Google
- Clique em "Criar projeto"

**Passo 2: Obter as credenciais**
- No console Firebase, clique no ícone de engrenagem → Configurações do projeto
- Na aba "Geral", role para baixo até ver "Seus aplicativos"
- Clique em "</>" para criar um app web
- Copie as credenciais:
  ```javascript
  const firebaseConfig = {
    apiKey: "SEU_API_KEY",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID"
  };
  ```

**Passo 3: Substituir no arquivo**
- Abra `index.html`
- Procure por `firebaseConfig`
- Substitua os valores PLACEHOLDER pelas credenciais reais

### 2️⃣ Configurar Stripe (Pagamentos)

**Passo 1: Criar conta no Stripe**
- Acesse [stripe.com](https://stripe.com)
- Clique em "Começar agora"
- Complete o cadastro

**Passo 2: Obter Chave Publicável**
- No dashboard Stripe, vá para "Developers" → "API keys"
- Copie a "Publishable key"
- No arquivo `index.html`, procure por `https://js.stripe.com/v3/` e você já tem a biblioteca carregada
- Use a chave quando for processar pagamentos

**Passo 3: Criar Produto**
- Em "Products" → "Add product"
- Nome: "HairConcept Pro"
- Preço: R$ 19,99
- Tipo de cobrança: Recorrente (Mensal)

### 3️⃣ Criar Backend para Processar Pagamentos

Você tem 2 opções:

**Opção A: Usar Firebase Functions (Gratuito)**
```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

Criar arquivo `functions/index.js`:
```javascript
const functions = require('firebase-functions');
const stripe = require('stripe')('sua_chave_secreta_stripe');

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1999, // R$ 19,99 em centavos
    currency: 'brl',
    payment_method: data.paymentMethodId,
    confirm: true
  });
  return { clientSecret: paymentIntent.client_secret };
});
```

**Opção B: Usar Node.js + Express (Mais robusto)**
```bash
mkdir backend
cd backend
npm init -y
npm install express stripe cors dotenv
```

Criar `server.js`:
```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: 'brl'
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

### 4️⃣ Fazer Deploy

**Opção A: GitHub Pages (Gratuito, sem backend)**
```bash
# Você já tem tudo no GitHub
# Vá para Settings → Pages → Source: main branch
# Seu site estará em https://usuario.github.io/agenda-sal-o-de-beleza-
```

**Opção B: Vercel (Recomendado - Fácil e Gratuito)**
```bash
npm install -g vercel
vercel login
vercel
```

**Opção C: Heroku (Com backend)**
```bash
npm install -g heroku
heroku login
heroku create seu-app
git push heroku main
```

### 5️⃣ Configuração de Segurança

⚠️ **IMPORTANTE**: Nunca deixe chaves secretas no código front-end!

- Chave Publicável do Stripe: OK no front-end ✅
- Chave Secreta do Stripe: NUNCA no front-end ❌
- API Key do Firebase: Pode estar no front-end, mas restringir em produção ⚠️

## 📊 Próximos Passos

1. ✅ Teste o site localmente
2. ✅ Configure as credenciais
3. ✅ Faça o deploy
4. ✅ Teste um pagamento (Stripe oferece cartões de teste)
5. ✅ Monitore sua receita no dashboard Stripe

## 🧪 Cartões de Teste Stripe

Para testar sem gastar dinheiro:

- **Cartão válido**: 4242 4242 4242 4242
- **Cartão recusado**: 4000 0000 0000 0002
- Data/CVC: Qualquer data futura, qualquer CVC

## 📞 Suporte

Precisa de ajuda?
- Firebase: [firebase.google.com/support](https://firebase.google.com/support)
- Stripe: [stripe.com/docs](https://stripe.com/docs)
- Comunidade: Stack Overflow com tags `firebase` e `stripe`

---

**Seu site está pronto para começar a gerar receita! 💰🎉**
