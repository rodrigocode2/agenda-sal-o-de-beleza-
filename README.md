# HairConcept — Agenda Salão de Beleza

Adições nesta branch: integração com MySQL (tabelas de customers, services, employees, appointments) e endpoints REST para agendamentos.

Como usar

1) Copie `.env.example` para `.env` e preencha as variáveis (DB_HOST, DB_USER, etc.).

2) Instale dependências:

   npm install

3) Rode migrations no seu MySQL (exemplo usando CLI):

   mysql -h DB_HOST -P DB_PORT -u DB_USER -p DB_NAME < migrations/001_schema.sql

4) Rode a API em desenvolvimento:

   npm run dev

Endpoints principais

- POST /api/appointments — criar agendamento
- GET  /api/appointments — listar agendamentos (query: date, employee_id)
- POST /api/appointments/:id/cancel — cancelar agendamento

Notas

- Não adicione senhas ao repositório. Use variáveis de ambiente na Vercel/serviço de hospedagem.
- Se o seu banco não é acessível publicamente, rode o backend no mesmo servidor/VPC ou use túnel SSH.
