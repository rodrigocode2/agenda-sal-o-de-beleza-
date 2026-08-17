// api/config.js - Serverless function que expõe apenas variáveis públicas para o frontend
// Segurança: retorna apenas chaves publicáveis e aplica CORS restrito usando FRONTEND_URL

export default function handler(req, res) {
  const allowedOrigin = process.env.FRONTEND_URL || '';

  // CORS básico e preflight
  if (allowedOrigin) {
    // Se a requisição vier com Origin, compare e set header apenas se corresponder
    const origin = req.headers.origin;
    if (origin && origin === allowedOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    }
  } else {
    // Fallback: não permitir origem wildcard em produção — permite requisições sem Origin (ex.: from server)
    // Para desenvolvimento rápido, se FRONTEND_URL não estiver definido, permitimos todas as origens.
    // ATENÇÃO: remova esse fallback em produção e defina FRONTEND_URL nas envs do Vercel.
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Somente chaves públicas — nunca exponha segredos do servidor aqui
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

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(config);
}
