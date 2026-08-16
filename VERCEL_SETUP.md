# 🚀 Configurar Variáveis de Ambiente no Vercel

Agora seu código está **seguro** e carrega as credenciais do Vercel automaticamente!

## ✅ O Que Você Precisa Fazer

### **PASSO 1: Obter as Credenciais**

#### Firebase:
1. Vá para: https://firebase.google.com/console
2. Selecione seu projeto `hairconcept`
3. Clique em **⚙️ Engrenagem** (canto superior esquerdo)
4. Clique em **"Configurações do Projeto"**
5. Role para baixo até **"Seus aplicativos"**
6. Selecione sua app **Web**
7. Você vai ver algo assim:
```javascript
{
  apiKey: "AIzaSyC_...",
  authDomain: "hairconcept-....firebaseapp.com",
  projectId: "hairconcept-...",
  storageBucket: "hairconcept-....appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

**Copie cada valor separadamente!**

#### Stripe:
1. Vá para: https://dashboard.stripe.com
2. Clique em **"Developers"** (lado esquerdo)
3. Clique em **"API keys"**
4. Procure por **Publishable key**
5. Vai ser assim: `pk_test_xxxxxxxxxxxxx`

**Copie esta chave!**

---

### **PASSO 2: Adicionar no Vercel**

1. Acesse: https://vercel.com/code-62aa/agenda-sal-o-de-beleza/settings/environments/production

2. Clique em **"Add New"** (botão cinza)

3. **Para cada variável abaixo**, repita o processo:
   - Preencha o **Name**
   - Cole o **Value** (do Firebase/Stripe)
   - Marque **Production**
   - Clique **"Save"**

#### Adicione as variáveis nesta ordem:

```
FIREBASE_API_KEY = cole_aqui
FIREBASE_AUTH_DOMAIN = cole_aqui
FIREBASE_PROJECT_ID = cole_aqui
FIREBASE_STORAGE_BUCKET = cole_aqui
FIREBASE_MESSAGING_SENDER_ID = cole_aqui
FIREBASE_APP_ID = cole_aqui
STRIPE_PUBLISHABLE_KEY = pk_test_cole_aqui
```

---

### **PASSO 3: Fazer Redeploy**

Após adicionar todas as variáveis:

1. Vá para: https://vercel.com/code-62aa/agenda-sal-o-de-beleza

2. Clique em **"Deployments"** (aba)

3. Clique nos **3 pontinhos** do deploy mais recente

4. Clique em **"Redeploy"**

5. **Aguarde ~1 minuto** até o deploy ficar pronto (status verde)

---

### **PASSO 4: Testar**

1. Abra seu site no Vercel

2. Tente fazer login/signup

3. Você deve conseguir criar uma conta sem erro

4. Se tudo funcionar: ✅ **Sucesso!**

---

## 🧪 Como Verificar se Funcionou

Abra o DevTools do navegador (F12):

1. Abra a aba **Console**
2. Procure por mensagens:
   - ✅ `Configuration loaded from API`
   - ✅ `Firebase initialized`

Se aparecer essas mensagens = **Está funcionando!**

---

## ❌ Se Algo der Erro

### "Configuration could not be loaded"
- Verifique se as variáveis estão adicionadas no Vercel
- Aguarde 5 minutos após adicionar (às vezes leva um tempo)
- Faça redeploy

### "Firebase not initialized"
- Verifique se o Firebase projectId está correto
- Confira se o FIREBASE_PROJECT_ID foi adicionado

### Vejo erros no console
- Copie o erro exato
- Verifique se todas as 7 variáveis foram adicionadas
- Faça redeploy

---

## 🎯 Próximo Passo

Após testar e confirmar que tudo funciona:

1. ✅ Testar criar uma conta (signup)
2. ✅ Testar fluxo de pagamento com cartão teste (4242 4242 4242 4242)
3. ✅ Confirmar que recebe os dados no Firebase

**Pronto! Seu site está pronto para ganhar dinheiro!** 💰

---

## 📞 Dúvidas?

Se ficar preso em algum passo, me chama! 🚀
