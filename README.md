# ✂️ HairConcept — Gestão Premium de Agendamentos para Salões

> **Sistema SaaS completo de agendamento para salões de beleza com autenticação Firebase, pagamento Stripe e dashboard profissional.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Vercel Deployment](https://img.shields.io/badge/Deployed-Vercel-000000.svg)](https://vercel.com)

---

## 🎯 Sobre o Projeto

**HairConcept** é uma plataforma SaaS moderna para gerenciamento de agendamentos em salões de beleza, barbearias e clínicas de estética. Com autenticação segura, processamento de pagamentos e dashboard intuitivo.

### 💰 Modelo de Receita
| Plano | Agendamentos/mês | Profissionais | Preço |
|-------|------------------|---------------|-------|
| **Gratuito** | 50 | 1 | R$ 0 |
| **Pro** | Ilimitado | Até 5 | R$ 19,99 |
| **Enterprise** | Ilimitado | Customizado | Contato |

---

## 🚀 Funcionalidades

### 👥 Para Clientes
- ✅ Autenticação segura (Firebase)
- ✅ Agendamento online 24/7
- ✅ Visualização de profissionais disponíveis
- ✅ Histórico de agendamentos
- ✅ Notificações de confirmação

### 💼 Para Salões
- ✅ Dashboard de agendamentos
- ✅ Gerenciamento de profissionais
- ✅ Relatórios e estatísticas
- ✅ Controle de receita
- ✅ Cobrança automática (Stripe)

### 🔐 Segurança & Compliance
- ✅ Autenticação OAuth (Google, Facebook)
- ✅ Criptografia end-to-end
- ✅ Conformidade PCI DSS (Stripe)
- ✅ HTTPS em produção
- ✅ Headers de segurança (HSTS, CSP, X-Frame-Options)

---

## 🛠️ Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Frontend** | HTML5, Tailwind CSS, Vanilla JS | - |
| **Backend** | Node.js, Express.js | 18+ |
| **Database** | Firebase Firestore | v10 |
| **Auth** | Firebase Authentication | v10 |
| **Payments** | Stripe API | v12 |
| **Hosting** | Vercel | - |
| **CDN** | Cloudflare | - |

---

## 📁 Estrutura do Projeto

```
agenda-sal-o-de-beleza-/
├── 📁 public/              # Arquivos estáticos para produção
│   ├── index.html          # Aplicação principal
│   └── historico/          # Versões antigas (referência)
│
├── 📁 api/                 # API serverless (Vercel)
│   └── config.js           # Endpoint de configuração
│
├── 📁 docs/                # Documentação completa
│   ├── INDEX.md            # Índice de documentação
│   ├── ESTRUTURA.md        # Visão geral do projeto
│   ├── SETUP.md            # Guia de configuração
│   ├── DEPLOY.md           # Guia de deploy
│   ├── VERCEL_SETUP.md     # Setup Vercel
│   └── examples/           # Exemplos de código
│
├── 📁 src/                 # Código JavaScript modular (futuro)
│
├── package.json            # Dependências Node.js
├── .env.example            # Variáveis de ambiente (template)
├── .gitignore              # Configuração Git
├── vercel.json             # Configuração Vercel
└── README.md               # Este arquivo
```

Para mais detalhes, consulte [docs/ESTRUTURA.md](./docs/ESTRUTURA.md).

---

## ⚡ Quick Start

### 1️⃣ Clonar Repositório
```bash
git clone https://github.com/rodrigocode2/agenda-sal-o-de-beleza-.git
cd agenda-sal-o-de-beleza-
```

### 2️⃣ Instalar Dependências
```bash
npm install
```

### 3️⃣ Configurar Ambiente
```bash
cp .env.example .env
# Editar .env com suas credenciais
```

### 4️⃣ Desenvolvimento Local
```bash
npm run dev
# Acessar: http://localhost:3000
```

### 5️⃣ Deploy (Vercel)
```bash
vercel
# ou fazer push para main (deploy automático)
```

---

## 📚 Documentação Completa

| Guia | Descrição |
|------|-----------|
| **[docs/INDEX.md](./docs/INDEX.md)** | 📋 Índice central de documentação |
| **[docs/ESTRUTURA.md](./docs/ESTRUTURA.md)** | 📁 Organização de pastas e arquivos |
| **[docs/SETUP.md](./docs/SETUP.md)** | 🔧 Configurar Firebase e Stripe |
| **[docs/DEPLOY.md](./docs/DEPLOY.md)** | 🚀 Deploy em Vercel/Heroku |
| **[docs/VERCEL_SETUP.md](./docs/VERCEL_SETUP.md)** | ☁️ Setup específico Vercel |

---

## 🔑 Configuração de Credenciais

### Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative **Authentication** e **Firestore**
4. Copie credenciais para `.env`

### Stripe
1. Acesse [Stripe Dashboard](https://dashboard.stripe.com)
2. Obtenha **API Keys**
3. Configure **Webhook** para `https://seu-dominio.com/api/webhook`
4. Copie credenciais para `.env`

Veja [docs/SETUP.md](./docs/SETUP.md) para instruções detalhadas.

---

## 📦 Variáveis de Ambiente

```env
# Firebase
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Stripe
STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

Copie `.env.example` como referência: `cp .env.example .env`

---

## 🚢 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
# Siga as instruções
```

### GitHub Actions (Automático)
```bash
git push origin main
# Deploy automático ao fazer push
```

Veja [docs/VERCEL_SETUP.md](./docs/VERCEL_SETUP.md) para mais opções.

---

## 🧪 Testes

```bash
# Executar testes (configurar conforme necessário)
npm run test

# Verificar linting
npm run lint

# Build para produção
npm run build
```

---

## 📊 Performance

- ⚡ **Lighthouse Score:** 95+
- 🎯 **Time to Interactive:** < 3s
- 📱 **Mobile Optimized:** 100% responsive
- 🔒 **Security Headers:** Implementados
- 🌍 **CDN:** Cloudflare integrado

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue no GitHub](https://github.com/rodrigocode2/agenda-sal-o-de-beleza-/issues) com:
- Descrição clara do problema
- Steps para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja [LICENSE](./LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Rodrigo Nunes dos Santos**
- GitHub: [@rodrigocode2](https://github.com/rodrigocode2)
- Email: rodrigo-n-s@live.com

---

## 📞 Suporte

- 📧 Email: rodrigo-n-s@live.com
- 🐛 Issues: [GitHub Issues](https://github.com/rodrigocode2/agenda-sal-o-de-beleza-/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/rodrigocode2/agenda-sal-o-de-beleza-/discussions)

---

## 🎉 Agradecimentos

Obrigado pelas contribuições e feedback da comunidade!

- [Tailwind CSS](https://tailwindcss.com) - Utilitários CSS
- [Firebase](https://firebase.google.com) - Backend
- [Stripe](https://stripe.com) - Pagamentos
- [Vercel](https://vercel.com) - Hosting
- [FontAwesome](https://fontawesome.com) - Ícones

---

## 📈 Roadmap

- [ ] App móvel nativa (React Native)
- [ ] WhatsApp Integration
- [ ] Email marketing
- [ ] Inteligência Artificial (agendamento automático)
- [ ] Múltiplas moedas
- [ ] API pública (v2)
- [ ] Marketplace de temas

---

**Última atualização:** 16 de agosto de 2026  
**Versão:** 1.0.0  
**Status:** ✅ Produção
