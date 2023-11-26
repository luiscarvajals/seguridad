import mongoose from 'mongoose';

const SedesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
    },
    img: [{ type: String }],
    
    calle: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
    zona: {
        type: String,
        required: true,
    },  
    pais: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    destacada: {
        type: Boolean,
        default: false,
    },

  

});

export default mongoose.model('Sedes', SedesSchema);
