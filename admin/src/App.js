//Configuraciones iniciales:
// npm i react-router-dom react-bootstrap bootstrap react-icons axios react-redux redux redux-thunk react-toastify framer-motion react-hot-toast @emotion/react @emotion/styled @mui/icons-material
// En package.json crear el proxy: "proxy": "http://localhost:8800/api" 
// Crear las carpetas necesarias


import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useContext } from "react";
import { AuthContexto } from "./Context/AuthContexto";
import { Navigate } from "react-router-dom";
import Login from "./Pages/login/Login";
import List from "./Components/list/List";
import Usuario from "./Pages/usuario/Usuario";
import {userInputs} from "./formSource";
import { userColumns} from "./datatablesource";
//import ActualizarUsuario from "./Pages/actualizarUsuario/ActualizarUsuario";


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
        
        <Route path="/" element={<Navigate to="/login" />}  />
        <Route path="/login" element={<Login />} />
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
        {/* <Route
          path="/usuarios/:id"
          element={
            <RutaProtegida>
              <Sidebar />
            <ActualizarUsuario inputs={userInputs} title="Actualizar Usuario" />
            </RutaProtegida>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;