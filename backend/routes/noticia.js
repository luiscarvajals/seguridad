import express from 'express';
import {crearNoticia, leerNoticias, leerNoticiaPorId, actualizarNoticia, borrarNoticia} from './../controllers/noticia.js';
import {verificarTokenAdmin} from './../extra/verficarToken.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Noticias
 *   description: Operaciones relacionadas con las noticias

/**
 * @swagger
 * /api/noticias/crear:
 *   post:
 *     summary: Crear una noticia
 *     description: Crea una nueva noticia.
 *     tags: [Noticias]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Noticia'
 *     responses:
 *       '200':
 *         description: Noticia creada con éxito
 *       '401':
 *         description: No autorizado
 */
router.post('/crear', verificarTokenAdmin, crearNoticia);

/**
 * @swagger
 * /api/noticias:
 *   get:
 *     summary: Obtener noticias
 *     description: Obtiene una lista de noticias.
 *     tags: [Noticias]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de noticias obtenida con éxito
 *       '401':
 *         description: No autorizado
 */
router.get('/', verificarTokenAdmin, leerNoticias);

/**
 * @swagger
 * /api/noticias/{id}:
 *   get:
 *     summary: Obtener noticia por ID
 *     description: Obtiene una noticia por su ID.
 *     tags: [Noticias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la noticia a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Noticia obtenida con éxito
 *       '401':
 *         description: No autorizado
 */
router.get('/:id', verificarTokenAdmin, leerNoticiaPorId);

/**
 * @swagger
 * /api/noticias/{id}:
 *   put:
 *     summary: Actualizar noticia por ID
 *     description: Actualiza una noticia por su ID.
 *     tags: [Noticias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la noticia a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Noticia actualizada con éxito
 *       '401':
 *         description: No autorizado
 */
router.put('/:id', verificarTokenAdmin, actualizarNoticia);

/**
 * @swagger
 * /api/noticias/{id}:
 *   patch:
 *     summary: Borrar noticia por ID
 *     description: Borra una noticia por su ID.
 *     tags: [Noticias]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la noticia a borrar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Noticia borrada con éxito
 *       '401':
 *         description: No autorizado
 */
router.patch('/:id', verificarTokenAdmin, borrarNoticia);

export default router;
