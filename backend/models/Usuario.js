import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
  },
  ciudad: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: false,
  },
  roles: {
    type: [String], // user, admin, etc
    default: ["admin"],
  },
  activo: {
    type: Boolean,
    default: true,
  },
  intentosFallidos: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Usuario", UsuarioSchema);
