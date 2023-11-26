import Carrera from "../models/Carrera.js";

export const crearCarrera = async (req, res, next) => {
    try {
      const {
        nombre,
        descripcion,
        img,
        categoria,
        modalidadGraduacion,
        duracion,
        perfilEgreso,
        perfilIngreso,
        planEstudio,
        campoOcupacional,
        requisitosIngreso,
        tituloOtorga,
        sede,
        contacto,
        correo,
        telefono,
        dirCarrera,
        // imgDirCarrera,
        ubicacionDirCarrera,

      } = req.body;
  
      // Validar datos de entrada (puedes agregar más validaciones según tus necesidades)
      if (!nombre || !descripcion ) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
      }
  
      const imagenes = Array.isArray(img) ? img : [img];
        //const imagen = Array.isArray(imgDirCarrera) ? imgDirCarrera : [imgDirCarrera];
        const mG = Array.isArray(modalidadGraduacion) ? modalidadGraduacion : [modalidadGraduacion];
  
      const nuevaCarrera = new Carrera({
        nombre,
        descripcion,
        img: imagenes,
        fecha_creacion: Date.now(),
        modalidadGraduacion:mG,
        duracion,
        categoria,
        perfilEgreso,
        perfilIngreso,
        planEstudio,
        campoOcupacional,
        requisitosIngreso,
        tituloOtorga,
        sede,
        contacto,
        correo,
        telefono,
        dirCarrera,
        //imgDirCarrera: imagen,
        ubicacionDirCarrera,
      });
  
      await nuevaCarrera.save();
  
      res.status(201).json({ mensaje: "Carrera creada con éxito", carrera: nuevaCarrera });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ mensaje: "Error de validación", detalles: error.message });
      }
  
      console.error(`Error al crear carrera: ${error.message}`);
      next(error);
    }
  };
  

export const listarCarreras = async (req, res, next) => {
  try {
    const carreras = await Carrera.find().sort({ nombre: 1 });
    res.status(200).json(carreras);
  } catch (error) {
    console.error(`Error al leer carreras: ${error.message}`);
    next(error);
  }
};

export const listarCarreraEspecifica = async (req, res, next) => {
  const { id } = req.params;
  try {
    const carrera = await Carrera.findById(id);
    if (!carrera) {
      return res.status(404).json({ mensaje: "Carrera no encontrada" });
    }
    if (!carrera.activo) {
      return res.status(404).json({ mensaje: "Carrera inactiva" });
    }
    res.status(200).json(carrera);
  } catch (error) {
    console.error(`Error al leer carrera por ID: ${error.message}`);
    next(error);
  }
};

export const actualizarCarrera = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Obtén la carrera existente
    const carreraExistente = await Carrera.findById(id);
    if (!carreraExistente) {
      return res.status(404).json({ mensaje: "Carrera no encontrada" });
    }
    // Si la carrera existe, actualízala
    const nuevosValores = {
      ...carreraExistente.toObject(), // Convierte la noticia existente a un objeto para evitar modificarla directamente
      ...req.body, // Utiliza los nuevos valores proporcionados en el cuerpo de la solicitud
    };
    const carreraActualizada = await Carrera.findByIdAndUpdate(
      id,
      nuevosValores,
      { new: true }
    );
    res.status(200).json(carreraActualizada);
  } catch (error) {
    console.error(`Error al actualizar carrera: ${error.message}`);
    next(error);
  }
};

export const eliminarCarrera = async (req, res, next) => {
  const { id } = req.params;
  try {
    const carrera = await Carrera.findById(id);
    if (!carrera) {
      return res.status(404).json({ mensaje: "Carrera no encontrada" });
    }
    if (!carrera.activo) {
      return res.status(404).json({ mensaje: "Carrera inactiva" });
    }
    const carreraEliminada = await Carrera.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );
    res.status(200).json(carreraEliminada);
  } catch (error) {
    console.error(`Error al eliminar carrera: ${error.message}`);
    next(error);
  }
};

export const listarCarrerasPre = async (req, res, next) => {
  try {
    const carreras = await Carrera.find({categoria: "Pregrado"});
    console.log("Carreras del back", carreras)
    res.status(200).json(carreras);
  } catch (error) {
    console.error(`Error al leer carreras: ${error.message}`);
    next(error);
  }
}

export const listarCarrerasPost = async (req, res, next) => {
  try {
    const carreras = await Carrera.find({categoria: "Postgrado"});
    res.status(200).json(carreras);
  } catch (error) {
    console.error(`Error al leer carreras: ${error.message}`);
    next(error);
  }
}
