// npm init -y 
//npm i express dotenv mongoose cookie-parser cors body-parser nodemon bcrypt jsonwebtoken
// En package.json:
//"type": "module",
//   "scripts": {
//     "start": "nodemon index.js"
//   },

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import cors from "cors";
import autenticacionRuta from "./routes/autenticacion.js";
import noticiasRuta from "./routes/noticia.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.BASE);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error(`Error al conectar con la base de datos: ${error}`);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongo desconectado");
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/autenticacion", autenticacionRuta);
app.use("/api/noticias", noticiasRuta);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Error interno del servidor";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

let serverReady = false;

app.listen(8800, () => {
  connect();
  serverReady = true;
  console.log("Server levantado en el puerto 8800 :)");
});

