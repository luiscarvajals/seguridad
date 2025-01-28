import { crearError } from "./error.js";

export const verificarRol = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRoles = req.usuario?.roles || [];

    // si el usuario tiene al menos uno de los roles permitidos, entonces tiene permiso
    const hasPermission = userRoles.some((r) => allowedRoles.includes(r));
    if (!hasPermission) {
      return next(crearError(403, "No tienes permiso para acceder a este recurso"));
    }
    next();
  };
};
