import express from 'express';
import {getDashboardData} from './../controllers/dashboard.js';
import {verificarTokenAdmin} from './../extra/verficarToken.js';

const router = express.Router();

router.get('/obtener', getDashboardData)


export default router;
