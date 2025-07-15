import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movie.js';
import exportRoutes from './routes/exportRoutes.js';
import recommendRoutes from './routes/recommedRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import db from './config/db.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); 
app.use('/api', exportRoutes);
app.use('/api', recommendRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
