// backend/routes/movie.js
import express from 'express';
import {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController.js';

import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD routes with token verification
router.post('/add', verifyToken, addMovie);
router.get('/list', verifyToken, getMovies);
router.put('/update/:id', verifyToken, updateMovie);
router.delete('/delete/:id', verifyToken, deleteMovie);

export default router;
