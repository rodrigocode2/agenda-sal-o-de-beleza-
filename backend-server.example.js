// backend/server.js - Servidor para processar pagamentos com Stripe
// Use para produção com Vercel, Heroku ou seu próprio servidor

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_sua_chave_aqui');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// Inicializar Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

// ========================================== //
// ROTA: Criar Payment Intent
// ========================================== //
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { email, salonName } = req.body;

    // Criar ou buscar cliente no Stripe
    let customer;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: { salonName }
      });
    }

    // Criar payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999, // R$ 19,99 em centavos
      currency: 'brl',
      customer: customer.id,
      metadata: {
        email,
        salonName,
        plan: 'pro'
      }
    });

    // Salvar no Firestore para referência
    await db.collection('payments').doc(paymentIntent.id).set({
      userId: email,
      customerId: customer.id,
      amount: 1999,
      currency: 'brl',
      status: 'pending',
      createdAt: new Date(),
      paymentIntentId: paymentIntent.id
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================== //
// ROTA: Confirmar Pagamento
// ========================================== //
app.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, email } = req.body;

    // Recuperar payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Atualizar status do usuário no Firestore
      await db.collection('users').doc(email).set({
        subscription: 'pro',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        paymentIntentId: paymentIntentId,
        stripeCustomerId: paymentIntent.customer,
        status: 'active'
      }, { merge: true });

      res.json({ success: true, message: 'Pagamento confirmado!' });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Pagamento não foi confirmado' 
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================== //
// ROTA: Verificar Status da Assinatura
// ========================================== //
app.get('/subscription-status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const userDoc = await db.collection('users').doc(email).get();

    if (!userDoc.exists) {
      return res.json({ subscription: 'free', status: 'active' });
    }

    const userData = userDoc.data();
    const now = new Date();
    const endDate = userData.subscriptionEndDate?.toDate();

    if (endDate && endDate > now) {
      res.json({
        subscription: userData.subscription || 'free',
        status: 'active',
        endDate: userData.subscriptionEndDate
      });
    } else {
      res.json({
        subscription: 'free',
        status: 'expired'
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================== //
// WEBHOOK: Stripe Event Handler
// ========================================== //
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Processar eventos do Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Pagamento confirmado:', paymentIntent.id);
      // Aqui você pode registrar o pagamento no banco de dados
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Pagamento falhou:', failedPayment.id);
      // Notificar usuário sobre falha
      break;

    case 'customer.subscription.deleted':
      const deletedSub = event.data.object;
      console.log('Assinatura cancelada:', deletedSub.id);
      // Atualizar status no Firestore
      break;

    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  res.json({ received: true });
});

// ========================================== //
// ROTA: Cancelar Assinatura
// ========================================== //
app.post('/cancel-subscription', async (req, res) => {
  try {
    const { email } = req.body;

    await db.collection('users').doc(email).update({
      subscription: 'free',
      status: 'cancelled',
      cancelledAt: new Date()
    });

    res.json({ success: true, message: 'Assinatura cancelada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================== //
// Health Check
// ========================================== //
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ========================================== //
// Iniciar servidor
// ========================================== //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor HairConcept rodando na porta ${PORT}`);
  console.log(`Stripe Key: ${process.env.STRIPE_SECRET_KEY ? 'Configurada ✅' : 'Faltando ❌'}`);
  console.log(`Firebase: ${process.env.FIREBASE_DATABASE_URL ? 'Configurado ✅' : 'Faltando ❌'}`);
});

module.exports = app;
