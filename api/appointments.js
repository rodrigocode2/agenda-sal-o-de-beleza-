const express = require('express');
const router = express.Router();
const pool = require('./mysql');

// Helper: verifica overlap para um funcionário
async function isOverlapping(conn, employee_id, start_time, end_time) {
  const [rows] = await conn.execute(
    `SELECT COUNT(*) AS cnt FROM appointments
     WHERE employee_id = ? AND status = 'scheduled'
       AND NOT (end_time <= ? OR start_time >= ?)`,
    [employee_id, start_time, end_time]
  );
  return rows[0].cnt > 0;
}

// Criar agendamento
router.post('/appointments', async (req, res) => {
  const { customer, employee_id, service_id, start_time, end_time } = req.body;
  if (!customer || !employee_id || !service_id || !start_time || !end_time) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Verificar overlap
    const overlap = await isOverlapping(conn, employee_id, start_time, end_time);
    if (overlap) {
      await conn.rollback();
      return res.status(409).json({ error: 'Horário indisponível' });
    }

    // Inserir cliente se não existir (por telefone/email único)
    let customerId;
    if (customer.id) {
      customerId = customer.id;
    } else {
      const [existing] = await conn.execute(
        `SELECT id FROM customers WHERE email = ? LIMIT 1`,
        [customer.email || null]
      );
      if (existing.length) customerId = existing[0].id;
      else {
        const [r] = await conn.execute(
          `INSERT INTO customers (name, phone, email, created_at) VALUES (?, ?, ?, NOW())`,
          [customer.name, customer.phone || null, customer.email || null]
        );
        customerId = r.insertId;
      }
    }

    // Inserir agendamento
    const [ins] = await conn.execute(
      `INSERT INTO appointments (customer_id, employee_id, service_id, start_time, end_time, status, created_at)
       VALUES (?, ?, ?, ?, ?, 'scheduled', NOW())`,
      [customerId, employee_id, service_id, start_time, end_time]
    );

    await conn.commit();
    res.json({ success: true, appointmentId: ins.insertId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// Listar agendamentos (filtro por data/funcionário)
router.get('/appointments', async (req, res) => {
  const { date, employee_id } = req.query;
  const where = [];
  const params = [];

  if (employee_id) {
    where.push('employee_id = ?'); params.push(employee_id);
  }
  if (date) {
    where.push('DATE(start_time) = ?'); params.push(date);
  }

  const q = `SELECT a.*, c.name AS customer_name, s.name AS service_name, e.name AS employee_name
             FROM appointments a
             JOIN customers c ON c.id = a.customer_id
             JOIN services s ON s.id = a.service_id
             JOIN employees e ON e.id = a.employee_id
             ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
             ORDER BY start_time`;
  try {
    const [rows] = await pool.execute(q, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Cancelar agendamento
router.post('/appointments/:id/cancel', async (req, res) => {
  const { id } = req.params;
  try {
    const [r] = await pool.execute(`UPDATE appointments SET status = 'cancelled' WHERE id = ?`, [id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
