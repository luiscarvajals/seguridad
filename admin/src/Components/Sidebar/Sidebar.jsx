import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSpring } from "react-spring";
import "./sidebar.css";
import axios from "axios";
import { AuthContexto } from "../../Context/AuthContexto";
import { motion } from "framer-motion";

const Sidebar = () => {
  // const [setSelected] = useState("Dashboard");
  const [sidebarOpen] = useState(true);

  // const handleToggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  const sidebarAnimation = useSpring({
    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
  });

  // const handleSelect = (option) => {
  //   setSelected(option);
  // };

  const { usuario } = useContext(AuthContexto);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContexto);

  const handleLogout = async () => {
    try {
      await axios.post("/autenticacion/logout");
      localStorage.removeItem("access_token_administrador");
      localStorage.removeItem("usuario");
      sessionStorage.removeItem("usuario");
      dispatch({ type: "LOGOUT", payload: { usuario: undefined } });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="sidebar" style={sidebarAnimation}>
        <motion.div
          className="sidebar-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inside">
            <motion.div
              className="insideUp"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2>Administrador</h2>
            </motion.div>
            <motion.div
              className="insideDown"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h5>Bienvenido: {usuario.nombre}</h5>
            </motion.div>
          </div>
        </motion.div>
  
        <ul className="sidebar-menu">
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/dashboard"
              //onClick={() => handleSelect("Dashboard")}
            >
              Dashboard
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/usuarios"
              //onClick={() => handleSelect("Usuarios")}
            >
              Usuarios
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/sedes"
              //onClick={() => handleSelect("Sedes")}
            >
              Sedes
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/noticias"
              //onClick={() => handleSelect("Noticias")}
            >
              Noticias
            </NavLink>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/carreras"
              //onClick={() => handleSelect("Carreras")}
            >
              Carreras
            </NavLink>
        </motion.li>

        <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/Eventos"
              //onClick={() => handleSelect("Eventos")}
            >
              Eventos
            </NavLink>
        </motion.li>

        <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <NavLink
              className="comp"
              to="/Multimedia"
              //onClick={() => handleSelect("Multimedia")}
            >
              Multimedia
            </NavLink>
        </motion.li>
      </ul>
      <motion.button
        className="button-logout"
        onClick={handleLogout}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Cerrar Sesión
      </motion.button>
    </div>
  );
};

export default Sidebar;