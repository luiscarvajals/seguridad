import mongoose from 'mongoose';

const CarreraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    img: [{ type: String }],
    activo: {
        type: Boolean,
        default: true,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_modificacion: {
        type: Date,
        default: Date.now,
    },
    fecha_eliminacion: {
        type: Date,
        default: Date.now,
    },
    fecha_publicacion: {
        type: Date,
        default: Date.now,
    },
    destacada: {
        type: Boolean,
        default: false,
    },
   
    categoria: {
        type: String,
    },
    modalidadGraduacion: [{
        type: String,
        required: true,
    }],
    duracion: {
        type: String,
        required: true,
    },
    perfilEgreso: {
        type: String,
        required: true,
    },
    perfilIngreso: {
        type: String,
        required: true,
    },
    planEstudio: {
        type: String,
        required: true,
    },
    campoOcupacional: {
        type: String,
        required: true,
    },
    requisitosIngreso: {
        type: String,
        required: true,
    },
    tituloOtorga: {
        type: String,
        required: true,
    },
    sede: {
        type: String,
        required: true,
    },
    contacto: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    dirCarrera: {
        type: String,
        required: true,
    },
    // imgDirCarrera: [{ type: String }],
    
    ubicacionDirCarrera:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Carrera', CarreraSchema);
