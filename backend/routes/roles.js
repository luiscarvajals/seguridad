import express from 'express';
import { getAvailableRoles, obtenerRolUsuario } from '../controllers/roles.js';

const router = express.Router();

router.get('/obtener', getAvailableRoles);
router.get("/:id", obtenerRolUsuario);

export default router;

