import Usuario from "../models/Usuario.js";
import { crearError } from "../extra/error.js";
import { sendEmail } from "../utils/sendEmail.js";
import { validatePasswordPolicy } from "../utils/validatePassword.js";
import bcrypt from "bcrypt";
import UserLog from "../models/userLog.js";

export const actualizarUsuario = async (req, res, next) => {
  try {
    // extraccion de password y otros campos
    const { password, activo, ...updateData } = req.body;

    // encontrando el user doc para actualizar
    const userDB = await Usuario.findById(req.params.id);
    if (!userDB) {
      throw crearError(404, "Usuario no encontrado");
    }

    // si se provee un password, manejar logica de politicas y reuso
    if (password) {
      // validacion de politica
      if (!validatePasswordPolicy(password)) {
        throw crearError(400, "La contraseña no cumple con la política de seguridad");
      }

      //  Revisar si la contraseña esta en el historico
      for (const oldEntry of userDB.passwordHistory || []) {
        const reused = await bcrypt.compare(password, oldEntry.hash);
        if (reused) {
          throw crearError(400, "No puedes reutilizar contraseñas anteriores");
        }
      }

      // Hash del nuevo password
      const hashedNew = await bcrypt.hash(password, 10);

      // registro de nuevo password en historico de contraseñas
      userDB.passwordHistory.push({
        hash: hashedNew,
        changedAt: new Date()
      });

      // estableciendo nuevo password con fecha de caducidad en 90 dias
      userDB.password = hashedNew;
      userDB.passwordExpiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

      // se envia el correo con los nuevos credenciales al usuario
      await sendEmail({
        to: userDB.email,
        subject: "Actualización de Contraseña",
        text: `Hola ${userDB.nombre}, tu nueva contraseña es: ${password}`,
        html: `<p>Hola ${userDB.nombre},<br/>Tu nueva contraseña es: <b>${password}</b></p>`
      });
    }

    // actualizacion de otros campos si se editan
    if (req.file) {
      updateData.img = req.file.filename;
    }
    if (typeof activo !== "undefined") {
      userDB.activo = activo;
    }
    Object.assign(userDB, updateData);

    // guardado de usuario actualizado
    const updatedUsuario = await userDB.save();

    await UserLog.create({
      userId: req.usuario?.id,         // admin que hizo el update, de JWT
      userName: req.usuario?.usuario,  // username de admin
      action: "UPDATE",                // or "UPDATE_USER"
      resource: "Usuario",
      method: req.method,              // "PUT"
      endpoint: req.originalUrl,       // "/usuarios/:id"
      details: {
        targetUserId: req.params.id,
        fieldsUpdated: Object.keys(req.body),
      },
    });

    res.status(200).json(updatedUsuario);
  } catch (err) {
    next(err);
  }
};
  
  export const borrarUsuario = async (req, res, next) => {
    try {
      const isAdmin = req.user.roles.includes('admin');
      if (!isAdmin) {
        throw crearError(403, 'No tienes permiso para eliminar usuarios');
      }
    
      await Usuario.findByIdAndUpdate(req.params.id, { activo: false });

      await UserLog.create({
        userId: req.usuario?.id,
        userName: req.usuario?.usuario,
        action: "DEACTIVATE",
        resource: "Usuario",
        method: req.method,
        endpoint: req.originalUrl,
        details: {
          targetUserId: req.params.id,
        },
      });

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