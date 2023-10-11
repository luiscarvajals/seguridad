import express from 'express';
import {crearNoticia, leerNoticias, leerNoticiaPorId, actualizarNoticia, borrarNoticia} from './../controllers/noticia.js';
import {verificarTokenAdmin} from './../extra/verficarToken.js';

const router = express.Router();

router.post('/crear',verificarTokenAdmin, crearNoticia);

router.get('/', verificarTokenAdmin, leerNoticias);

router.get('/:id', verificarTokenAdmin, leerNoticiaPorId);

router.put('/:id', verificarTokenAdmin, actualizarNoticia);

router.patch('/:id', verificarTokenAdmin, borrarNoticia);

export default router;
