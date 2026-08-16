# ✂️ HairConcept — Gestão de Agendamentos para Salões (Com Cobrança)

**HairConcept** é um sistema SaaS completo para agendamento em salões de beleza com suporte a autenticação, pagamento mensal (R$ 19,99/mês) e dashboard de gerenciamento.

🌐 **Site Oficial:** [GitHub Pages](https://rodrigocode2.github.io/agenda-sal-o-de-beleza-)  
💳 **Modelo de Receita:** SaaS (Software as a Service)  
💰 **Preço:** R$ 19,99/mês (Plano Pro)  

---

## 🎯 Proposta de Valor

| Feature | Gratuito | Pro |
|---------|----------|-----|
| Agendamentos/mês | 50 | Ilimitado |
| Profissionais | 1 | 5+ |
| Histórico | Limitado | Completo |
| Suporte | Email | Prioritário |
| **Preço** | **R$ 0** | **R$ 19,99** |

---

## 🚀 Funcionalidades

### Frontend
* ✅ **Landing Page Profissional** - Apresentação de planos e benefícios
* ✅ **Autenticação** - Login/Signup com Firebase
* ✅ **Agenda em Tempo Real** - Visualização por profissional
* ✅ **Gerenciamento de Clientes** - Cadastro com foto e dados
* ✅ **Dashboard** - Estatísticas e status de assinatura
* ✅ **Design Responsivo** - Mobile e desktop

### Backend
* ✅ **Pagamentos Stripe** - Processamento seguro de transações
* ✅ **Autenticação Firebase** - Gerenciamento de usuários
* ✅ **Banco de Dados Firestore** - Armazenamento escalável
* ✅ **Webhooks** - Sincronização de eventos de pagamento
* ✅ **REST API** - Endpoints para gerenciar assinaturas

---

## 💻 Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | HTML5, Tailwind CSS, Vanilla JS, FontAwesome |
| **Backend** | Node.js, Express.js |
| **Banco de Dados** | Google Firestore |
| **Autenticação** | Firebase Authentication |
| **Pagamentos** | Stripe API |
| **Deploy** | Vercel, GitHub Pages |

---

## 🚀 Quick Start

### 1. Clonar Repositório
```bash
git clone https://github.com/rodrigocode2/agenda-sal-o-de-beleza-.git
cd agenda-sal-o-de-beleza-
```

### 2. Abrir no Navegador
```bash
# Abrir arquivo index.html direto
open index.html
# ou
firefox index.html
# ou
python -m http.server 8000  # e acessar http://localhost:8000
```

### 3. Configurar Credenciais
Veja o arquivo `SETUP.md` para:
- Configurar Firebase
- Configurar Stripe
- Variáveis de ambiente

---

## 📖 Documentação

| Arquivo | Descrição |
|---------|-----------|
| **SETUP.md** | Guia de configuração Firebase + Stripe |
| **DEPLOY.md** | Guia de deploy em Vercel/Heroku |
| **config.example.js** | Template de configuração |
| **.env.example** | Variáveis de ambiente necessárias |
| **backend-server.example.js** | Código do servidor Node.js |

---

## 💰 Monetização

### Modelo de Receita
- **Plano Gratuito:** Até 50 agendamentos/mês (sem custo)
- **Plano Pro:** Ilimitado por R$ 19,99/mês
- **Plano Enterprise:** Customizado (contato direto)

### Como Começar a Ganhar
1. Deploy do site (Vercel/GitHub Pages)
2. Configurar Firebase + Stripe
3. Compartilhar link com salões
4. Receber pagamentos via Stripe

---

## 📊 Dashboard de Vendas

Após configurar Stripe, você poderá:
- 📈 Ver receita mensal
- 👥 Acompanhar número de clientes
- 💳 Monitorar transações
- 📉 Analisar taxa de churn

---

## 🔐 Segurança

- ✅ Autenticação com Firebase
- ✅ Chaves Stripe em servidor (backend)
- ✅ CORS configurado
- ✅ Validação de dados
- ✅ Webhooks verificados

---

## 📂 Estrutura do Projeto

```
agenda-sal-o-de-beleza-/
├── index.html                 # Frontend principal (SPA)
├── pagina salao.html          # Versão anterior (arquivada)
├── backend-server.example.js  # Servidor Node.js
├── config.example.js          # Config Firebase/Stripe
├── package.json              # Dependências Node.js
├── .env.example              # Variáveis de ambiente
├── SETUP.md                  # Guia de configuração
├── DEPLOY.md                 # Guia de deployment
└── README.md                 # Este arquivo
```

---

## 🧪 Testando

### Teste Local
```bash
# Abrir em servidor local
python -m http.server 3000
# Acessar http://localhost:3000
```

### Cartões de Teste (Stripe)
- **Válido:** 4242 4242 4242 4242
- **Recusado:** 4000 0000 0000 0002
- **Data/CVC:** Qualquer futuro / Qualquer

---

## 🤖 Desenvolvido com IA

Este projeto foi desenvolvido com suporte de **GitHub Copilot**, incluindo:
- ✅ Arquitetura completa
- ✅ Integração Firebase + Stripe
- ✅ Sistema de autenticação
- ✅ Dashboard e UI/UX

---

## 📞 Suporte

- **Documentação Firebase:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Documentação Stripe:** [stripe.com/docs](https://stripe.com/docs)
- **Issues GitHub:** [Issues](https://github.com/rodrigocode2/agenda-sal-o-de-beleza-/issues)

---

## 💡 Roadmap Futuro

- [ ] App Mobile (React Native)
- [ ] Integração com WhatsApp API
- [ ] Notificações por Email
- [ ] Relatórios avançados
- [ ] API Pública para integrações
- [ ] Sistema de avalições
- [ ] Marketplace de temas

---

## 📄 Licença

Este projeto é **Proprietary** - Todos os direitos reservados.  
Para comercialização ou contribuições, entre em contato.

---

## 👨‍💻 Autor

**Rodrigo Nunes** - [GitHub](https://github.com/rodrigocode2)

---

## 🎯 Objetivo do Projeto

Criar um SaaS lucrativos para salões de beleza, gerando receita mensal através de assinatura.

**Meta:** 100 salões pagantes em 6 meses = **R$ 2.000/mês de receita recorrente** 💰

---

<div align="center">

### ⭐ Se este projeto te ajudou, deixe uma star!

**[⬆ Voltar ao topo](#-hairconcept--gestão-de-agendamentos-para-salões-com-cobrança)**

</div>

