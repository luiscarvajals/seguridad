import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    });

    export default mongoose.model("Roles", RolesSchema);