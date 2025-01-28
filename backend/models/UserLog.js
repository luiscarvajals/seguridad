import mongoose from "mongoose";

const UserLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  userName: { type: String, default: "" },
  action: { type: String, required: true }, // e.g. "CREATE", "UPDATE", "DEACTIVATE", "LOGIN", "LOGOUT"
  resource: { type: String, required: true }, // e.g. "Usuario", "Noticia", "Sede"
  method: { type: String, required: false }, // e.g. "POST", "PUT", "PATCH"
  endpoint: { type: String, required: false }, // e.g. "/usuarios"
  timestamp: { type: Date, default: Date.now },
  details: { type: mongoose.Schema.Types.Mixed }, // objeto opcional para mas informacion
});

export default mongoose.model("UserLog", UserLogSchema);
