// npm init -y 
//npm i express dotenv mongoose cookie-parser cors body-parser nodemon jsonwebtoken
// En package.json:
//"type": "module",
//   "scripts": {
//     "start": "nodemon index.js"
//   },

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import autenticacionRuta from "./routes/autenticacion.js";
import noticiasRuta from "./routes/noticia.js";
import usuariosRuta from "./routes/usuario.js";
import rolesRuta from "./routes/roles.js";
import sedesRuta from "./routes/sedes.js";
import carrerasRuta from "./routes/carrera.js";
import graduacionesRuta from "./routes/graduacion.js";
import dashboardRuta from "./routes/dashboard.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.config.js";

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

// Definir roles
export const roles = {
  admin: "admin",
  admin2: "admin2",
  admin3: "admin3",
  // Agrega más roles según sea necesario
};

// Rutas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/autenticacion", autenticacionRuta);
app.use("/api/noticias", noticiasRuta);
app.use("/api/usuarios", usuariosRuta);
app.use("/api/roles",rolesRuta);
app.use("/api/sedes",sedesRuta);
app.use("/api/carreras",carrerasRuta);
app.use("/api/graduaciones",graduacionesRuta);
app.use("/api/dashboard", dashboardRuta)

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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

