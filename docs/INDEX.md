# 📚 Índice de Documentação - HairConcept

Bem-vindo à documentação do **HairConcept**, um sistema SaaS de agendamento para salões de beleza.

## 📋 Guias Rápidos

### 🔧 Configuração
- **[ESTRUTURA.md](./ESTRUTURA.md)** - Visão geral do projeto e organização de pastas
- **[SETUP.md](./SETUP.md)** - Configurar Firebase, Stripe e variáveis de ambiente
- **[DEPLOY.md](./DEPLOY.md)** - Deploy em Vercel e outras plataformas
- **[VERCEL_SETUP.md](./VERCEL_SETUP.md)** - Instruções específicas para Vercel

### 💻 Exemplos
- **[examples/backend-server.example.js](./examples/backend-server.example.js)** - Servidor Node.js com Express
- **[examples/config.example.js](./examples/config.example.js)** - Template de configuração

---

## 🚀 Começando Rápido

### 1. Instalação
```bash
# Clonar repositório
git clone https://github.com/rodrigocode2/agenda-sal-o-de-beleza-.git
cd agenda-sal-o-de-beleza-

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env
```

### 2. Configurar Credenciais
Abra [SETUP.md](./SETUP.md) e siga os passos:
- Criar projeto Firebase
- Configurar Stripe
- Adicionar credenciais em `.env`

### 3. Desenvolvimento Local
```bash
npm run dev
# Abrir http://localhost:3000
```

### 4. Deploy
Siga [VERCEL_SETUP.md](./VERCEL_SETUP.md) para deploy automático no Vercel.

---

## 📁 Estrutura de Pastas

```
├── docs/              # Documentação (você está aqui!)
├── public/            # Frontend (HTML, CSS, JS)
├── api/               # API serverless
├── src/               # Código JavaScript modular
└── package.json       # Dependências
```

Para mais detalhes, veja [ESTRUTURA.md](./ESTRUTURA.md).

---

## 🎯 Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | HTML5, Tailwind CSS, Vanilla JS |
| **Backend** | Node.js, Express |
| **Banco de Dados** | Firestore |
| **Autenticação** | Firebase Auth |
| **Pagamentos** | Stripe |
| **Deploy** | Vercel |

---

## 💰 Modelo de Preços

| Plano | Limite | Preço |
|-------|--------|-------|
| **Gratuito** | 50 agendamentos/mês | R$ 0 |
| **Pro** | Ilimitado | R$ 19,99/mês |
| **Enterprise** | Customizado | Contato |

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação em `/docs`
2. Verifique os exemplos em `/docs/examples`
3. Abra uma issue no GitHub

---

**Última atualização:** 16 de agosto de 2026  
**Versão:** 1.0.0
