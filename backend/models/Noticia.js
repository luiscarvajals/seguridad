import mongoose from 'mongoose';

const NoticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  destacada: {
    type: Boolean,
    default: false,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha_publicacion: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Noticia', NoticiaSchema);
