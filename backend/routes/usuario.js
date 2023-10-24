import express from "express";
import {actualizarUsuario, borrarUsuario, obtenerUsuario, obtenerUsuarios} from "../controllers/usuario.js";
import {verificarTokenAdmin} from "../extra/verficarToken.js";

const router = express.Router();

//Actualizar
router.put("/:id",verificarTokenAdmin, actualizarUsuario);

//Delete
router.patch("/:id",verificarTokenAdmin, borrarUsuario);

//Get Usuario único
router.get("/:id",verificarTokenAdmin, obtenerUsuario);
//Get todos los Usuarios   
router.get("/",verificarTokenAdmin, obtenerUsuarios);


export default router;