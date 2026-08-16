# 📁 Estrutura do Projeto HairConcept

```
agenda-sal-o-de-beleza-/
├── 📄 README.md                    # Documentação principal
├── 📄 package.json                 # Dependências Node.js
├── 📄 .env.example                 # Variáveis de ambiente
├── 📄 .gitignore                   # Configuração Git
├── 📄 vercel.json                  # Configuração Vercel
│
├── 📁 public/                      # Arquivos estáticos para produção
│   ├── 📄 index.html               # Frontend principal
│   └── 📁 historico/               # Arquivos legados
│       └── 📄 pagina-salao.html    # Página antiga (referência)
│
├── 📁 api/                         # API serverless Vercel
│   └── 📄 config.js                # Endpoint para configuração
│
├── 📁 docs/                        # Documentação do projeto
│   ├── 📄 SETUP.md                 # Configuração de credenciais
│   ├── 📄 DEPLOY.md                # Guia de deploy
│   ├── 📄 VERCEL_SETUP.md          # Setup específico Vercel
│   └── 📁 examples/                # Exemplos de código
│       ├── 📄 backend-server.example.js   # Servidor Node.js
│       └── 📄 config.example.js           # Exemplo de config
│
└── 📁 src/                         # Código fonte da aplicação
    └── (para futuros componentes JavaScript)
```

## 🎯 Descrição de Diretórios

### `/public`
Contém os arquivos estáticos que serão servidos ao cliente:
- **index.html** - Página principal da aplicação
- **historico/** - Arquivos de versões anteriores

### `/api`
Funções serverless executadas no Vercel:
- **config.js** - Retorna variáveis de configuração públicas (Firebase, Stripe)

### `/docs`
Toda a documentação do projeto:
- **SETUP.md** - Como configurar Firebase e Stripe
- **DEPLOY.md** - Como fazer deploy
- **VERCEL_SETUP.md** - Instruções específicas para Vercel
- **examples/** - Código de exemplo e templates

### `/src`
Repositório para código JavaScript modular futuro:
- Utilitários
- Módulos JavaScript
- Componentes reutilizáveis

---

## 🚀 Fluxo de Desenvolvimento

1. **Local Development**
   ```bash
   npm install
   npm run dev
   # Acessar http://localhost:3000
   ```

2. **Teste em Produção (Vercel)**
   ```bash
   vercel
   ```

3. **Deploy Final**
   ```bash
   git push origin main
   # Vercel faz deploy automático
   ```

---

## 📝 Arquivos Importantes

| Arquivo | Propósito |
|---------|-----------|
| `.env.example` | Template de variáveis de ambiente |
| `vercel.json` | Configuração de headers, rewrites e segurança |
| `.gitignore` | Arquivos e pastas ignoradas pelo Git |
| `package.json` | Dependências e scripts de execução |

---

## 💡 Boas Práticas

- ✅ Nunca commitar `.env` ou chaves secretas
- ✅ Usar `.env.example` como referência
- ✅ Manter `docs/` atualizado
- ✅ Testar em Vercel preview antes de produção
- ✅ Usar convenção de nomes: kebab-case para pastas, snake_case para scripts
