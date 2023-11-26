import Sedes from "../models/Sedes.js";

export const crearSede = async (req, res, next) => {
    try {
        const {
        nombre,
        ciudad,
        telefono,
        img,
        calle,
        numero,
        zona,
        pais,
        email,
        } = req.body;
    
        const imagenes = Array.isArray(img) ? img : [img];
    
        const nuevaSede = new Sedes({
        nombre,
        ciudad,
        telefono,
        img: imagenes,
        calle,
        numero,
        zona,
        pais,
        email,
        });
    
        await nuevaSede.save();
        res.status(201).json({ mensaje: "Sede creada con éxito" });
    } catch (error) {
        console.error(`Error al crear sede: ${error.message}`);
        next(error);
    }
    }

    export const obtenerSedes = async (req, res, next) => {
        try {
          const sedes = await Sedes.find().sort({ fecha_publicacion: -1 });
          res.status(200).json(sedes);
        } catch (error) {
          console.error(`Error al leer sedes: ${error.message}`);
          next(error);
        }
      };

      export const obtenerSedePorId = async (req, res, next) => {
        try{
            const sede = await Sedes.findById(req.params.id);
            res.status(200).json(sede);

        }catch(error){
            console.error(`Error al leer sede: ${error.message}`);
            next(error);
        }

        }

        export const actualizarSede = async (req, res, next) => {
          const {id} = req.params;
          try {
              
              const sedeExistente = await Sedes.findById(id);
              if (!sedeExistente) {
                return res.status(404).json({ mensaje: "Sede no encontrada" });
              }

              const nuevosValores = {
                ...sedeExistente.toObject(), 
                ...req.body,
              };

              const sedeActualizada = await Sedes.findByIdAndUpdate(id, nuevosValores, { new: true });

    
              res.status(200).json(sedeActualizada);
            } catch (error) {
              console.error(`Error al actualizar sede: ${error.message}`);
              next(error);
            }
          };

          export const borrarSede = async (req, res, next) => {
            try {
              await Sedes.findByIdAndDelete(req.params.id);
              res.status(200).json({ mensaje: "Sede borrada con éxito" });
            } catch (error) {
              console.error(`Error al borrar sede: ${error.message}`);
              next(error);
            }
          };
