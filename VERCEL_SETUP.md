# Configuração de Implantação na Vercel (Supabase)

Este guia descreve como hospedar o sistema **HairConcept** na Vercel utilizando o banco de dados em nuvem Supabase.

---

## 1. Conexão com o Supabase

O projeto já utiliza a biblioteca cliente do Supabase diretamente via CDN no arquivo `public/index.html`.

As credenciais do projeto são:
- **SUPABASE_URL:** `https://fhjspvgdcynffnfybbog.supabase.co`
- **SUPABASE_KEY:** Chave `anon` `public` configurada no arquivo de entrada.

---

## 2. Passos para Implantação na Vercel

1. Acesse o painel da [Vercel](https://vercel.com/dashboard).
2. Clique em **Add New...** -> **Project**.
3. Selecione o repositório `agenda-sal-o-de-beleza`.
4. Mantenha as configurações padrão (Root Directory: `./`).
5. Clique em **Deploy**.

---

## 3. Configuração do CORS no Supabase

Após a Vercel gerar o domínio do projeto (ex: `https://seu-app.vercel.app`):

1. Acesse o painel do [Supabase](https://supabase.com/dashboard).
2. Vá em **Project Settings** -> **API**.
3. Em **URL Configuration**, adicione o domínio da Vercel no campo **Site URL** e em **Redirect URLs**.

---

## 📞 Dúvidas?

Se ficar preso em algum passo, me chama! 🚀
