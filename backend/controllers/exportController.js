import db from '../config/db.js';
import { format } from 'date-fns';
import { writeToPath } from 'fast-csv';
import fs from 'fs';
import path from 'path';

export const downloadCSV = (req, res) => {
  const sql = "SELECT * FROM movielist";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
    const filePath = path.join('exports', `movies_${timestamp}.csv`);

    // Ensure exports folder exists
    if (!fs.existsSync('exports')) fs.mkdirSync('exports');

    const ws = fs.createWriteStream(filePath);

    writeToPath(filePath, results, { headers: true })
      .on('finish', () => {
        res.download(filePath, (err) => {
          if (err) console.error("❌ Download error:", err);
        });
      })
      .on('error', (err) => {
        console.error("❌ CSV export error:", err);
        res.status(500).json({ message: "CSV export failed", error: err });
      });
  });
};
