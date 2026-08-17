const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('./_db');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_env';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { path } = req.query || {};
  // Support both /api/auth (post with action) or distinguishing by body.action
  const { action, nome, email, senha } = req.body || {};

  const act = action || 'loginOrRegister'; // fallback

  try {
    if (act === 'register') {
      if (!nome || !email || !senha) return res.status(400).json({ error: 'Dados incompletos' });
      const hash = await bcrypt.hash(senha, SALT_ROUNDS);
      await mysql.query('INSERT INTO usuarios (nome, email, senha_hash, created_at) VALUES (?, ?, ?, NOW())', [nome, email, hash]);
      await mysql.end();
      return res.json({ success: true });
    }

    if (act === 'login') {
      if (!email || !senha) return res.status(400).json({ error: 'Dados incompletos' });
      const results = await mysql.query('SELECT id, senha_hash, nome FROM usuarios WHERE email = ? LIMIT 1', [email]);
      await mysql.end();
      if (!results || results.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });
      const user = results[0];
      const match = await bcrypt.compare(senha, user.senha_hash);
      if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });
      const token = jwt.sign({ sub: user.id, name: user.nome }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: { id: user.id, nome: user.nome, email } });
    }

    return res.status(400).json({ error: 'Ação inválida' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
