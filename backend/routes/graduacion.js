import express from 'express';
import { getAvailableGrad, agregarGraduacion } from '../controllers/graduacion.js';

const router = express.Router();

router.get('/obtener', getAvailableGrad);
router.post('/agregar', agregarGraduacion);


export default router;