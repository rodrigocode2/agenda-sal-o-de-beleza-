// api/config.js - Retorna as variáveis de ambiente para o frontend
// Isso é uma função serverless do Vercel que expõe as variáveis de forma segura

export default function handler(req, res) {
  // Retornar apenas as variáveis públicas (que podem estar no cliente)
  // As chaves secretas são mantidas seguras no servidor
  
  const config = {
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.FIREBASE_APP_ID || ''
    },
    stripe: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
    }
  };

  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  res.status(200).json(config);
}
