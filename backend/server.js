import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movie.js';
import exportRoutes from './routes/exportRoutes.js';
import recommendRoutes from './routes/recommedRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
const __dirname=path.resolve();



app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); 
app.use('/api', exportRoutes);
app.use('/api', recommendRoutes);

if(process.env.NODE_ENV ==='production'){
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get("*",(req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  })

}


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
