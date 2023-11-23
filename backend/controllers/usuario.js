import Usuario from "../models/Usuario.js";
import { crearError } from "../extra/error.js";

export const actualizarUsuario = async (req, res, next) => {
    try {
      const { activo, ...updateData } = req.body;
      const keys = Object.keys(updateData);
      const updatedFields = {};
      for (let i = 0; i < keys.length; i++) {
        updatedFields[keys[i]] = updateData[keys[i]];
      }
  
      const updatedUser = Object.assign({}, updatedFields, { activo });
      
      // Comprobar si se ha enviado la imagen
      if(req.file){
        updatedUser.img = req.file.filename;
      }
  
      const options = { new: true };
      const updatedUsuario = await Usuario.findByIdAndUpdate(req.params.id, { $set: updatedUser }, options);
      //logger.info(`Usuario actualizado: ${updatedUsuario}`);
      res.status(200).json(updatedUsuario);
    } catch (err) {
      //logger.error(`Error al actualizar usuario: ${err.message}`);
      next(err);
    }
  };
  
  
  // export const borrarUsuario = async (req, res, next) => {
  //   try {
  //     await Usuario.findByIdAndDelete(req.params.id);
  //     logger.info(`Usuario eliminado con éxito`);
  //     res.status(200).json("Usuario ha sido borrado");
  //   } catch (err) {
  //     logger.error(`Error al eliminar usuario: ${err.message}`);
  //     next(err);
  //   }
  // };
  
  export const borrarUsuario = async (req, res, next) => {
    try {
      const isAdmin = req.user.roles.includes('admin');
      //logger.info(`Este es el log para saber si el admin llega o no ${req.user.isAdmin}` ) // Obtener el valor de isAdmin del objeto de usuario en la solicitud
      if (!isAdmin) {
        throw crearError(403, 'No tienes permiso para eliminar usuarios');
      }
    
      await Usuario.findByIdAndUpdate(req.params.id, { activo: false });
      //logger.info(`Usuario eliminado con éxito por el administrador ${req.user.usuario}`);
      res.status(200).json("Usuario ha sido borrado");
    } catch (err) {
      //logger.error(`Error al eliminar usuario: ${err.message}`);
      next(err);
    }
  };
  
  
  
  export const obtenerUsuario = async (req, res, next) => {
    //Get Usuario único
    try {
      const usuario = await Usuario.findById(req.params.id);
      //console.log(`Usuario obtenido: ${usuario}`);
      res.status(200).json(usuario);
    } catch (err) {
      console.log(`Error al obtener usuario: ${err.message}`);
      next(err);
    }
  };
  
  export const obtenerUsuarios = async (req, res, next) => {
    try {
      const usuarios = await Usuario.find();
      //console.log(`Usuarios obtenidos: ${usuarios}`);
      res.status(200).json(usuarios);
    } catch (err) {
      console.log(`Error al obtener usuarios: ${err.message}`);
      next(err);
    }
  };