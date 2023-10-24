import Roles from '../models/Roles.js';
import Usuario from '../models/Usuario.js';

export const getAvailableRoles = async (req, res) => {
    try {
        const roles = await Roles.find(); // Esto obtendría todos los roles de la base de datos
        res.status(200).json(roles);
      } catch (error) {
        next(error);
      }
};

export const obtenerRolUsuario = async (req, res, next) => {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      
      // Aquí obtienes el rol del usuario y lo envías en la respuesta
      const rolUsuario = usuario.roles;
  
      res.status(200).json({ rol: rolUsuario });
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      next(error);
    }
  };