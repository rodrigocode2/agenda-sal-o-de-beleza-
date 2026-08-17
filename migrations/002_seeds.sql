-- migrations/002_seeds.sql

-- Seed data (plain SQL) for employees, services and example customer/appointment
-- This file is safe to run directly with the mysql CLI

INSERT INTO employees (name)
SELECT 'Ana' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Ana') LIMIT 1;
INSERT INTO employees (name)
SELECT 'Bruno' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Bruno') LIMIT 1;
INSERT INTO employees (name)
SELECT 'Carla' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM employees WHERE name = 'Carla') LIMIT 1;

INSERT INTO services (name, duration_minutes, price)
SELECT 'Corte Feminino', 45, 80.00
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Corte Feminino') LIMIT 1;
INSERT INTO services (name, duration_minutes, price)
SELECT 'Corte Masculino', 30, 45.00
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Corte Masculino') LIMIT 1;
INSERT INTO services (name, duration_minutes, price)
SELECT 'Escova', 60, 70.00
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Escova') LIMIT 1;
INSERT INTO services (name, duration_minutes, price)
SELECT 'Hidratação', 50, 120.00
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = 'Hidratação') LIMIT 1;

INSERT INTO customers (name, phone, email, created_at)
SELECT 'Cliente Exemplo', '11999990000', 'cliente@example.com', NOW()
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE email = 'cliente@example.com') LIMIT 1;

-- Insere um agendamento de exemplo (amanhã 10:00 - 10:45) somente se employee/service/customer existirem e não houver conflito
INSERT INTO appointments (customer_id, employee_id, service_id, start_time, end_time, status, created_at)
SELECT c.id, e.id, s.id,
  CONCAT(DATE(DATE_ADD(NOW(), INTERVAL 1 DAY)), ' 10:00:00'),
  CONCAT(DATE(DATE_ADD(NOW(), INTERVAL 1 DAY)), ' 10:45:00'),
  'scheduled', NOW()
FROM customers c
JOIN employees e ON e.name = 'Ana'
JOIN services s ON s.name = 'Corte Feminino'
WHERE c.email = 'cliente@example.com'
  AND NOT EXISTS (
    SELECT 1 FROM appointments a
    WHERE a.employee_id = e.id
      AND a.status = 'scheduled'
      AND NOT (a.end_time <= CONCAT(DATE(DATE_ADD(NOW(), INTERVAL 1 DAY)), ' 10:00:00') OR a.start_time >= CONCAT(DATE(DATE_ADD(NOW(), INTERVAL 1 DAY)), ' 10:45:00'))
  )
LIMIT 1;
