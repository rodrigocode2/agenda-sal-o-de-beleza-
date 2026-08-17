-- migrations/002_seeds.sql
-- Seed data: employees, services, example customer

-- Employees
INSERT INTO employees (name) VALUES
('Ana'),
('Bruno'),
('Carla');

-- Services
INSERT INTO services (name, duration_minutes, price) VALUES
('Corte Feminino', 45, 80.00),
('Corte Masculino', 30, 45.00),
('Escova', 60, 70.00),
('Hidratação', 50, 120.00);

-- Optional example customer (only insert if not exists)
INSERT INTO customers (name, phone, email, created_at)
SELECT * FROM (SELECT 'Cliente Exemplo' AS name, '11999990000' AS phone, 'cliente@example.com' AS email, NOW() AS created_at) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM customers WHERE email = 'cliente@example.com'
) LIMIT 1;

-- Optional example appointment (only if employee and service exist)
-- This inserts an appointment for Ana for 'Corte Feminino' tomorrow at 10:00 if no overlapping appointment exists.

SET @emp_id = (SELECT id FROM employees WHERE name = 'Ana' LIMIT 1);
SET @srv_id = (SELECT id FROM services WHERE name = 'Corte Feminino' LIMIT 1);
SET @cust_id = (SELECT id FROM customers WHERE email = 'cliente@example.com' LIMIT 1);

-- Only insert if all ids present and no overlap
IF @emp_id IS NOT NULL AND @srv_id IS NOT NULL AND @cust_id IS NOT NULL THEN
  SET @start_time = DATE_ADD(DATE(NOW()), INTERVAL 1 DAY) + INTERVAL 10 HOUR;
  SET @end_time = DATE_ADD(@start_time, INTERVAL 45 MINUTE);
  IF NOT EXISTS (
    SELECT 1 FROM appointments WHERE employee_id = @emp_id AND status = 'scheduled' AND NOT (end_time <= @start_time OR start_time >= @end_time)
  ) THEN
    INSERT INTO appointments (customer_id, employee_id, service_id, start_time, end_time, status, created_at)
    VALUES (@cust_id, @emp_id, @srv_id, @start_time, @end_time, 'scheduled', NOW());
  END IF;
END IF;
