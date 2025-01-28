import mongoose from "mongoose";

const ApplicationLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  level: { type: String, default: "INFO" }, // e.g. INFO, WARN, ERROR
  message: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed }, // objeto opcional para mas informacion
});

export default mongoose.model("ApplicationLog", ApplicationLogSchema);
