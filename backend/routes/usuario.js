import express from "express";
import {actualizarUsuario, borrarUsuario, obtenerUsuario, obtenerUsuarios} from "../controllers/usuario.js";
import {verificarTokenAdmin} from "../extra/verficarToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con los usuarios

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar usuario por ID
 *     description: Actualiza un usuario por su ID.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario actualizado con éxito
 *       '401':
 *         description: No autorizado
 */
router.put("/:id", verificarTokenAdmin, actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   patch:
 *     summary: Borrar usuario por ID
 *     description: Borra un usuario por su ID.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a borrar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario borrado con éxito
 *       '401':
 *         description: No autorizado
 */
router.patch("/:id", verificarTokenAdmin, borrarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene un usuario por su ID.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario obtenido con éxito
 *       '401':
 *         description: No autorizado
 */
router.get("/:id", verificarTokenAdmin, obtenerUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuarios obtenida con éxito
 *       '401':
 *         description: No autorizado
 */
router.get("/", verificarTokenAdmin, obtenerUsuarios);

export default router;