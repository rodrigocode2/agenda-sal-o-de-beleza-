const mysql = require('./_db');

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { date, employee_id } = req.query;
      const where = [];
      const params = [];
      if (employee_id) { where.push('a.employee_id = ?'); params.push(employee_id); }
      if (date) { where.push('DATE(a.start_time) = ?'); params.push(date); }
      const q = `SELECT a.*, c.name AS customer_name, s.name AS service_name, e.name AS employee_name
                 FROM appointments a
                 JOIN customers c ON c.id = a.customer_id
                 JOIN services s ON s.id = a.service_id
                 JOIN employees e ON e.id = a.employee_id
                 ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
                 ORDER BY a.start_time`;
      const rows = await mysql.query(q, params);
      await mysql.end();
      return res.json(rows || []);
    }

    if (req.method === 'POST') {
      const { customer, employee_id, service_id, start_time, end_time } = req.body || {};
      if (!customer || !employee_id || !service_id || !start_time || !end_time) return res.status(400).json({ error: 'Dados incompletos' });

      // Start transaction
      await mysql.query('START TRANSACTION');

      // Check overlap
      const overlapQ = `SELECT COUNT(*) AS cnt FROM appointments WHERE employee_id = ? AND status = 'scheduled' AND NOT (end_time <= ? OR start_time >= ?)`;
      const overlapRes = await mysql.query(overlapQ, [employee_id, start_time, end_time]);
      const overlapCount = overlapRes && overlapRes[0] && overlapRes[0].cnt ? overlapRes[0].cnt : (overlapRes[0] ? Object.values(overlapRes[0])[0] : 0);
      if (Number(overlapCount) > 0) {
        await mysql.query('ROLLBACK');
        await mysql.end();
        return res.status(409).json({ error: 'Horário indisponível' });
      }

      // Insert or find customer
      let customerId = null;
      if (customer.id) customerId = customer.id;
      else if (customer.email) {
        const existing = await mysql.query('SELECT id FROM customers WHERE email = ? LIMIT 1', [customer.email]);
        if (existing && existing.length) customerId = existing[0].id;
      }
      if (!customerId) {
        const insertCust = await mysql.query('INSERT INTO customers (name, phone, email, created_at) VALUES (?, ?, ?, NOW())', [customer.name, customer.phone || null, customer.email || null]);
        customerId = insertCust.insertId || (insertCust && insertCust[0] && insertCust[0].insertId);
      }

      // Insert appointment
      const ins = await mysql.query('INSERT INTO appointments (customer_id, employee_id, service_id, start_time, end_time, status, created_at) VALUES (?, ?, ?, ?, ?, \'scheduled\', NOW())', [customerId, employee_id, service_id, start_time, end_time]);
      const appointmentId = ins.insertId || (ins && ins[0] && ins[0].insertId);

      await mysql.query('COMMIT');
      await mysql.end();

      return res.json({ success: true, appointmentId });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    try { await mysql.query('ROLLBACK'); } catch (e) {}
    await mysql.end();
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
