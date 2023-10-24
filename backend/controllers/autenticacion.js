import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { crearError } from '../extra/error.js';
import logger from '../extra/winston.js';
import { roles } from '../index.js';


export const registroUsuario = async (req, res, next) => {
    try {
      const {
        nombre,
        apellido,
        fechaNacimiento,
        usuario,
        email,
        password,
        pais,
        img,
        ciudad,
        telefono,
      } = req.body;
  
      const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { usuario }] });
      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El usuario o correo electrónico ya está registrado.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        fechaNacimiento,
        usuario,
        email,
        password: hashedPassword,
        pais,
        img,
        ciudad,
        telefono,
        roles: ['admin'],
        activo: true,
        intentosFallidos: 0,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
  
      await nuevoUsuario.save();
  
      res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
      console.error(`Error al registrar usuario: ${error.message}`);
      next(error);
    }
  };
  

export const loginAdmin = async (req, res, next) => {
    const user = await Usuario.findOne({ usuario: req.body.usuario, activo: true });

  try {
    await Usuario.findOne({ usuario: req.body.usuario, activo: true});

    if (!user.roles.includes(roles.admin)) {
      logger.warn("Intento de inicio de sesión de un usuario no registrado"); // Registro de warning en el logger
      throw crearError(401, "Acceso denegado");
    }else{
   
      const contraseñaValida = await bcrypt.compare(req.body.password, user.password);
    

    if (!contraseñaValida) {
      await Usuario.findByIdAndUpdate(user._id, { $inc: { intentosFallidos: 1 } });
      logger.warn("Contraseña incorrecta"); // Registro de warning en el logger

      if (user.intentosFallidos >= 2) {
        //logger.warn(`El usuario ${user.usuario} ha alcanzado el límite de intentos fallidos`); // Registro de warning en el logger
        throw crearError(404, "El administrador ha alcanzado el límite de intentos fallidos. Por favor, inténtelo de nuevo en 5 segundos.");
      }
      return next(crearError(400, "Contraseña incorrecta"));
      logger.warn(`El usuario ${user.usuario} ingresó una contraseña incorrecta`); // Registro de warning en el logger
    }

    await Usuario.findByIdAndUpdate(user._id, { intentosFallidos: 0 });



    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT, { expiresIn: '1h' });
    const {password, roles, ...otherDeails} = user._doc;

    res
    .cookie("admin_token", token, { 
      httpOnly: true 
    })
    .status(200)
    .json({ detalles: {...otherDeails}, roles});
  }
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = (req, res) => {
    res.clearCookie("admin_token");
    res.status(200).json({ mensaje: 'Cierre de sesión exitoso para administrador' });
  };
  


  
