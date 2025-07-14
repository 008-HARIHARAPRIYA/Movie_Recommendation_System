import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',  // Update with your actual MySQL password
  database: 'Movies'    // Ensure your database is named correctly
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL connected');
});

export default db;
