import express from "express";
import {actualizarUsuario, borrarUsuario, obtenerUsuario, obtenerUsuarios} from "../controllers/usuario.js";
import {verificarTokenAdmin} from "../extra/verficarToken.js";

const router = express.Router();


router.put("/:id", verificarTokenAdmin, actualizarUsuario);


router.patch("/:id", verificarTokenAdmin, borrarUsuario);


router.get("/:id", verificarTokenAdmin, obtenerUsuario);


router.get("/", verificarTokenAdmin, obtenerUsuarios);

export default router;