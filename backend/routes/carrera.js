import express from 'express';
import {crearCarrera, listarCarreras, listarCarreraEspecifica, actualizarCarrera, eliminarCarrera} from './../controllers/carrera.js';
import {verificarTokenAdmin} from './../extra/verficarToken.js';

const router = express.Router();


router.post('/',verificarTokenAdmin, crearCarrera);

router.get('/', listarCarreras);

router.get('/:id', listarCarreraEspecifica);

router.put('/:id',verificarTokenAdmin, actualizarCarrera);

router.patch('/:id',verificarTokenAdmin, eliminarCarrera);


export default router;
