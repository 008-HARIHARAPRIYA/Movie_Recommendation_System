import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load .env vars

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'Movies',
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

export default db;
