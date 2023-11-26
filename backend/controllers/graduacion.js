import Graduacion from '../models/Graduacion.js';

export const getAvailableGrad = async (req, res) => {
    try {
        const grad = await Graduacion.find();
        res.status(200).json(grad);
      } catch (error) {
        next(error);
      }
};

export const agregarGraduacion = async (req, res, next) => {
    const { nombre, descripcion } = req.body;
    try {
      const graduacion = await Graduacion.create({
        nombre,
        descripcion,
      });
      res.status(200).json(graduacion);
    } catch (error) {
      console.error(`Error al crear graduacion: ${error.message}`);
      next(error);
    }
  }
