const fs = require('fs');
const path = require('path');
const pool = require('../api/mysql');

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'migrations', '002_seeds.sql'), 'utf8');
    // Split statements by semicolon and run sequentially
    const statements = sql.split(/;\n/).map(s => s.trim()).filter(Boolean);
    const conn = await pool.getConnection();
    try {
      for (const stmt of statements) {
        // Skip if statement empty
        if (!stmt) continue;
        await conn.query(stmt);
      }
      console.log('Seeds applied successfully');
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('Error running seeds:', err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

run();
