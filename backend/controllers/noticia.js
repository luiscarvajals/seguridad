import Noticia from '../models/Noticia.js';

export const crearNoticia = async (req, res, next) => {
  try {
    const { titulo, descripcion, destacada, contenido, img } = req.body;

    const imagenes = Array.isArray(img) ? img : [img];

    const nuevaNoticia = new Noticia({
      titulo,
      descripcion,
      destacada,
      contenido,
      img: imagenes,
    });

    await nuevaNoticia.save();
    res.status(201).json({ mensaje: 'Noticia creada con éxito' });
  } catch (error) {
    console.error(`Error al crear noticia: ${error.message}`);
    next(error);
  }
};



export const leerNoticias = async (req, res, next) => {
    try {
      const noticias = await Noticia.find().sort({ fecha_publicacion: -1 });
      res.status(200).json(noticias);
    } catch (error) {
      console.error(`Error al leer noticias: ${error.message}`);
      next(error);
    }
  };

  export const leerNoticiasDestacadaActivo = async (req, res, next) => {
    try {
      const noticias = await Noticia.find({ destacada: true, activo:true }).sort({ fecha_publicacion: -1 });
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
    // if (!noticia.activo) {
    //   return res.status(404).json({ mensaje: 'Noticia inactiva' });
    // }
    res.status(200).json(noticia);
  } catch (error) {
    console.error(`Error al leer noticia por ID: ${error.message}`);
    next(error);
  }
};


export const actualizarNoticia = async (req, res, next) => {
  const { id } = req.params;
  try {

    const noticiaExistente = await Noticia.findById(id);

    const nuevosValores = {
      ...noticiaExistente.toObject(),
      ...req.body, 
    };
    

    const noticiaActualizada = await Noticia.findByIdAndUpdate(id, nuevosValores, { new: true });

    res.status(200).json(noticiaActualizada);
  } catch (error) {
    console.error(`Error al actualizar noticia: ${error.message}`);
    next(error);
  }
};


  //borrado lógico
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
