import jwt from "jsonwebtoken";
import { crearError } from '../extra/error.js';

export const verificarTokenAdmin = async (req, res, next) => {
    const token = req.cookies.admin_token; 
    if (!token) {
    return next(crearError(401, "No autorizado"));
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT);
        req.usuario = decoded;
        next();
      } catch (err) {
        return next(crearError(403, "Token no válido"));
      }
  };
  