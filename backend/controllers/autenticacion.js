import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { crearError } from '../extra/error.js';
import { sendEmail } from '../utils/sendEmail.js';
import { validatePasswordPolicy } from '../utils/validatePassword.js';
import axios from 'axios';

export const registroUsuario = async (req, res, next) => {
  try {
    // verificando si el usuario o email ya existen
    const existingUser = await Usuario.findOne({ usuario: req.body.usuario });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const existingEmail = await Usuario.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "El email ya existe" });
    }

    // Verificando si password cumple con politicas
    if(!validatePasswordPolicy(req.body.password)) {
      return res.status(400).json({ message: "La contraseña no cumple con la política de seguridad (longitud minima de 10 caracteres, con mayus, minus, numeros y simbolos)" });
    }

    // hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // estableciendo la fecha de expiración de la contraseña en 90 días
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 90);

    // contruccion de nuevo usuario
    const newUser = new Usuario({
      ...req.body,
      password: hashedPassword,
      passwordExpiresAt: expirationDate,
      passwordHistory: [
        {
          hash: hashedPassword,
          changedAt: new Date()
        }
      ]
    });

    await newUser.save();

    // enviando email con las credenciales al usuario
    await sendEmail({
      to: req.body.email,
      subject: "Credenciales de acceso - UCB",
      text: `Hola ${req.body.nombre} ${req.body.apellido}, 
      Tus credenciales son:
      Usuario: ${req.body.usuario}
      Contraseña: ${req.body.password}`,
      html: `
        <h3>¡Bienvenido a UCB!</h3>
        <p>Estas son tus credenciales:</p>
        <ul>
          <li><strong>Usuario:</strong> ${req.body.usuario}</li>
          <li><strong>Contraseña:</strong> ${req.body.password}</li>
        </ul>
        <p>Por favor, guarda esta información de manera segura.</p>
      `
    });

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    next(err);
  }
};
  

export const loginAdmin = async (req, res, next) => {
  try {
    const {recaptchaToken} = req.body;
    if (!recaptchaToken) {
      throw crearError(400, "Falta recaptchaToken");
    }
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
    const {data} = await axios.post(verifyUrl);
    if (!data.success) {
      throw crearError(400, "Captcha invalido");
    }

    // buscando usuario
    const user = await Usuario.findOne({ usuario: req.body.usuario, activo: true });
    if (!user) {
      throw crearError(404, "Usuario no encontrado o inactivo");
    }

    // verificando si usuario esta bloqueado
    const now = new Date();
    if (user.lockedUntil && user.lockedUntil > now) {
      const secondsLeft = Math.ceil((user.lockedUntil - now) / 1000);
      console.log(`Cuenta bloqueada. Intente de nuevo en ${secondsLeft} segundos.`);
      throw crearError(403, `Cuenta bloqueada. Intente de nuevo en ${secondsLeft} segundos.`);
    }

    // verificando si password expiro
    if (user.passwordExpiresAt && user.passwordExpiresAt < now) {
      throw crearError(403, "La contraseña ha expirado. Debes cambiarla antes de iniciar sesión.");
    }

    // comparando el password hasheado
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      // Incrementar intentosFallidos
      user.intentosFallidos += 1;
      if (user.intentosFallidos >= 3) {
        // bloqueo por 10 seg
        user.lockedUntil = new Date(Date.now() + 10 * 1000);
      }
      await user.save();
      throw crearError(400, "Contraseña incorrecta");
    }

    // si password es correcto se resetea el conteo de intentos fallidos
    user.intentosFallidos = 0;
    user.lockedUntil = null;
    await user.save();

    // creando token
    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT, {
      expiresIn: '1h',
    });

    // retornando datos de usuario
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("admin_token", token, { httpOnly: true })
      .status(200)
      .json({ detalles: { ...otherDetails }, roles: user.roles });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const logoutAdmin = (req, res) => {
    res.clearCookie("admin_token");
    res.status(200).json({ mensaje: 'Cierre de sesión exitoso para administrador' });
  };
  


  
