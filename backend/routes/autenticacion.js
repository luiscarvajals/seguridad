import express from "express";
import { registroUsuario, loginAdmin, logoutAdmin } from "../controllers/autenticacion.js";
import { verificarTokenAdmin } from "../extra/verficarToken.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/logout", logoutAdmin);

router.post("/registro", registroUsuario);

export default router;