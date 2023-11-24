import mongoose from "mongoose";

const GraduacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    });

    export default mongoose.model("Graduacion", GraduacionSchema);