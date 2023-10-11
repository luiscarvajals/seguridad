import Noticia from '../models/Noticia.js';


// Crear Noticia
export const crearNoticia = async (req, res, next) => {
    try {
      const { titulo, descripcion, destacada, contenido } = req.body;
      const nuevaNoticia = new Noticia({
        titulo,
        descripcion,
        destacada,
        contenido,
      });
  
      await nuevaNoticia.save();
      res.status(201).json({ mensaje: 'Noticia creada con éxito' });
    } catch (error) {
      console.error(`Error al crear noticia: ${error.message}`);
      next(error);
    }
  };

// Leer Noticias (todas las noticias activas)
export const leerNoticias = async (req, res, next) => {
    try {
      const noticias = await Noticia.find({ activo: true }).sort({ fecha_publicacion: -1 });
      res.status(200).json(noticias);
    } catch (error) {
      console.error(`Error al leer noticias: ${error.message}`);
      next(error);
    }
  };

// Leer una Noticia por ID
export const leerNoticiaPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const noticia = await Noticia.findById(id);
    if (!noticia) {
      return res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }
    if (!noticia.activo) {
      return res.status(404).json({ mensaje: 'Noticia inactiva' });
    }
    res.status(200).json(noticia);
  } catch (error) {
    console.error(`Error al leer noticia por ID: ${error.message}`);
    next(error);
  }
};

  
  // Actualizar Noticia
  export const actualizarNoticia = async (req, res, next) => {
    const { id } = req.params;
    try {
      const noticiaActualizada = await Noticia.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(noticiaActualizada);
    } catch (error) {
      console.error(`Error al actualizar noticia: ${error.message}`);
      next(error);
    }
};
  
  // Borrado Lógico de Noticia (marcar como inactiva)
  export const borrarNoticia = async (req, res, next) => {
    const { id } = req.params;
    try {
      await Noticia.findByIdAndUpdate(id, { activo: false });
      res.status(200).json({ mensaje: 'Noticia marcada como inactiva' });
    } catch (error) {
      console.error(`Error al borrar noticia: ${error.message}`);
      next(error);
    }
  };
