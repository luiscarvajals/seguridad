import express from 'express';
import {crearNoticia, leerNoticias, leerNoticiaPorId, actualizarNoticia, borrarNoticia, leerNoticiasDestacadaActivo} from './../controllers/noticia.js';
import {verificarTokenAdmin} from './../extra/verficarToken.js';

const router = express.Router();


router.post('/crear', verificarTokenAdmin, crearNoticia);


router.get('/', leerNoticias);


router.get('/:id', leerNoticiaPorId);

router.get('/activo/destacada',leerNoticiasDestacadaActivo)


router.put('/:id', verificarTokenAdmin, actualizarNoticia);


router.patch('/:id', verificarTokenAdmin, borrarNoticia);

export default router;
