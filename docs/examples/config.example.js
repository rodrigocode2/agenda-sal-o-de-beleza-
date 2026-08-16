# Configuração de Firebase e Stripe para HairConcept

## Arquivo: config.example.js
# Faça uma cópia como `config.js` e preencha seus valores

export const firebaseConfig = {
  apiKey: "AIzaSyC_SUA_API_KEY_AQUI",
  authDomain: "seu-projeto-123.firebaseapp.com",
  projectId: "seu-projeto-123",
  storageBucket: "seu-projeto-123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

export const stripeConfig = {
  publishableKey: "pk_live_SEU_PUBLISHABLE_KEY_AQUI",
  // ou para testes: pk_test_CHAVE_DE_TESTE
};

export const priceList = {
  free: {
    name: "Plano Gratuito",
    price: 0,
    bookingsPerMonth: 50,
    professionals: 1,
    features: ["Até 50 agendamentos/mês", "1 profissional"]
  },
  pro: {
    name: "Plano Pro",
    price: 19.99,
    priceId: "price_123abc", // ID do produto no Stripe
    bookingsPerMonth: "ilimitado",
    professionals: 5,
    features: [
      "Agendamentos ilimitados",
      "Até 5 profissionais",
      "Histórico completo",
      "Suporte prioritário"
    ]
  }
};
