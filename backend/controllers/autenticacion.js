import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

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

    const hashedPassword = await bcrypt.hash(password, 10); // Utiliza bcryptjs.hash

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
  try {
    const user = await Usuario.findOne({ usuario: req.body.usuario, activo: true });

    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const contraseñaValida = await bcrypt.compare(req.body.password, user.password);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id, roles: [user.roles] }, process.env.JWT, { expiresIn: '1h' });
    const { password, roles, ...otherDetails } = user._doc;

    res
      .cookie("admin_token", token, {
        httpOnly: true
      })
      .status(200)
      .json({ detalles: { ...otherDetails }, roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAdmin = (req, res) => {
    res.clearCookie("admin_token");
    res.status(200).json({ mensaje: 'Cierre de sesión exitoso para administrador' });
  };
  


  
