import express from "express";
import { registroUsuario, loginAdmin, logoutAdmin } from "../controllers/autenticacion.js";
import { verificarTokenAdmin } from "../extra/verficarToken.js";

const router = express.Router();
/**
 * @swagger
 * /api/autenticacion/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     description: Inicia sesión como administrador utilizando credenciales.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '401':
 *         description: Credenciales incorrectas
 */

router.post("/login", loginAdmin);

/**
 * @swagger
 * /api/autenticacion/logout:
 *   post:
 *     summary: Cerrar sesión como administrador
 *     description: Cierra la sesión de administrador.
 *     tags:
 *       - Autenticación
 *     responses:
 *       '200':
 *         description: Sesión cerrada con éxito
 */

router.post("/logout", logoutAdmin);

/**
 * @swagger
 * /api/autenticacion/registro:
 *   post:
 *     summary: Registrar usuario
 *     description: Registra un nuevo usuario como administrador.
 *     tags:
 *       - Autenticación
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       '200':
 *         description: Usuario registrado con éxito
 *       '401':
 *         description: No autorizado
 */

router.post("/registro",verificarTokenAdmin, registroUsuario);

export default router;