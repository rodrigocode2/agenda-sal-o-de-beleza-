/api/appointments - Serverless handler

Supports:
  - GET /api/appointments?date=YYYY-MM-DD&employee_id=1
  - POST /api/appointments  (body: { customer:{name,email,phone}, employee_id, service_id, start_time, end_time })

This file is a serverless function for Vercel.
