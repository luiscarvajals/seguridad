import Usuario from '../models/Usuario.js';
import Sedes from '../models/Sedes.js';
import Carrera from '../models/Carrera.js';



export const getDashboardData = async (req, res) => {
try {
    const usuarios = await Usuario.find().select("usuario ciudad activo");
    const sedes = await Sedes.find().select("pais ciudad activo");
    const carreras = await Carrera.find().select("categoria sede activo modalidadGraduacion");

    const data = {
        usuarios,
        sedes,
        carreras,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};