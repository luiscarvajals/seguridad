//Configuraciones iniciales:
// npm i react-router-dom react-bootstrap bootstrap react-icons axios react-redux redux redux-thunk react-toastify framer-motion react-hot-toast @emotion/react @emotion/styled @mui/icons-material
// En package.json crear el proxy: "proxy": "http://localhost:8800/api"
// Crear las carpetas necesarias

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { useContext } from "react";
import { AuthContexto } from "./Context/AuthContexto.js";
import { Navigate } from "react-router-dom";
import Login from "./Pages/login/Login.jsx";
import List from "./Components/list/List.jsx";
import Usuario from "./Pages/usuario/Usuario.jsx";
import {
  userInputs,
  noticiaInputs,
  sedesInputs,
  carrerasInputs,
} from "./formSource.js";
import {
  noticiaColumns,
  userColumns,
  sedesColumns,
  carrerasColumns,
} from "./datatablesource.js";
import ActualizarUsuario from "./Pages/actualizarUsuario/actualizarUsuario.jsx";
import Noticia from "./Pages/noticia/Noticia.jsx";
import ActualizarNoticia from "./Pages/actualizarNoticia/actualizarNoticia.jsx";
import ActualizarSede from "./Pages/actualizarSede/actualizarSede.jsx";
import Sedes from "./Pages/sedes/Sedes.jsx";
import Carrera from "./Pages/carrera/Carrera.jsx";
import ActualizarCarrera from "./Pages/actualizarCarrera/actualizarCarrera.jsx";
import Dashboard from "./Pages/dashbaord/Dashboard.jsx";

function App() {
  const RutaProtegida = ({ children }) => {
    const { usuario } = useContext(AuthContexto);

    if (!usuario) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          exact
          path="/dashboard"
          element={
            <RutaProtegida>
              <Sidebar />
              <Dashboard />
            </RutaProtegida>
          }
        />

        <Route
          exact
          path="/usuarios"
          element={
            <RutaProtegida>
              <Sidebar />
              <List columns={userColumns} />
            </RutaProtegida>
          }
        />
        <Route
          path="/usuarios/nuevoUsuario"
          element={
            <RutaProtegida>
              <Sidebar />
              <Usuario inputs={userInputs} title="Agregar nuevo usuario" />
            </RutaProtegida>
          }
        />
        <Route
          path="/usuarios/:id"
          element={
            <RutaProtegida>
              <Sidebar />
              <ActualizarUsuario
                inputs={userInputs}
                title="Actualizar Usuario"
              />
            </RutaProtegida>
          }
        />

        <Route
          exact
          path="/sedes"
          element={
            <RutaProtegida>
              <Sidebar />
              <List columns={sedesColumns} />
            </RutaProtegida>
          }
        />
        <Route
          path="/sedes/nuevoUsuario"
          element={
            <RutaProtegida>
              <Sidebar />
              <Sedes inputs={sedesInputs} title="Agregar nueva Sede" />
            </RutaProtegida>
          }
        />
        <Route
          path="/sedes/:id"
          element={
            <RutaProtegida>
              <Sidebar />
              <ActualizarSede inputs={sedesInputs} title="Actualizar Noticia" />
            </RutaProtegida>
          }
        />

        <Route
          exact
          path="/noticias"
          element={
            <RutaProtegida>
              <Sidebar />
              <List columns={noticiaColumns} />
            </RutaProtegida>
          }
        />
        <Route
          path="/noticias/nuevoUsuario"
          element={
            <RutaProtegida>
              <Sidebar />
              <Noticia inputs={noticiaInputs} title="Agregar nueva noticia" />
            </RutaProtegida>
          }
        />
        <Route
          path="/noticias/:id"
          element={
            <RutaProtegida>
              <Sidebar />
              <ActualizarNoticia
                inputs={noticiaInputs}
                title="Actualizar Noticia"
              />
            </RutaProtegida>
          }
        />

      <Route
          exact
          path="/carreras"
          element={
            <RutaProtegida>
              <Sidebar />
              <List columns={carrerasColumns} />
            </RutaProtegida>
          }
        />
        <Route
          path="/carreras/nuevoUsuario"
          element={
            <RutaProtegida>
              <Sidebar />
              <Carrera inputs={carrerasInputs} title="Agregar nueva carrera" />
            </RutaProtegida>
          }
        />
        <Route
          path="/carreras/:id"
          element={
            <RutaProtegida>
              <Sidebar />
              <ActualizarCarrera
                inputs={carrerasInputs}
                title="Actualizar Carrera"
              />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
