const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./mysql');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_env';

// Register
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: 'Dados incompletos' });

  try {
    const hash = await bcrypt.hash(senha, SALT_ROUNDS);
    const [r] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, created_at) VALUES (?, ?, ?, NOW())',
      [nome, email, hash]
    );
    return res.json({ success: true, userId: r.insertId });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email já cadastrado' });
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Dados incompletos' });

  try {
    const [rows] = await pool.execute('SELECT id, senha_hash, nome FROM usuarios WHERE email = ? LIMIT 1', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Credenciais inválidas' });
    const user = rows[0];
    const match = await bcrypt.compare(senha, user.senha_hash);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ sub: user.id, name: user.nome }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, nome: user.nome, email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao efetuar login' });
  }
});

module.exports = router;
