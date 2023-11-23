import express from 'express';
import {obtenerSedes, obtenerSedePorId, crearSede, actualizarSede, borrarSede} from './../controllers/sedes.js';
import {verificarTokenAdmin} from './../extra/verficarToken.js';


const router = express.Router();

router.get('/',verificarTokenAdmin, obtenerSedes);

router.get('/:id', verificarTokenAdmin, obtenerSedePorId);

router.post('/crear', verificarTokenAdmin, crearSede);

router.put('/:id', verificarTokenAdmin, actualizarSede);

router.patch('/:id', verificarTokenAdmin, borrarSede);




export default router;