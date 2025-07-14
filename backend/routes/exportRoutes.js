import express from 'express';
import { downloadCSV } from '../controllers/exportController.js';

const router = express.Router();

router.get('/export', downloadCSV);

export default router;
