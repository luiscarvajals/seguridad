import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSpring } from "react-spring";
import "./sidebar.css";
import axios from "axios";
import { AuthContexto } from "../../Context/AuthContexto";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const sidebarAnimation = useSpring({
    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
  });

  const { usuario, dispatch } = useContext(AuthContexto);
  const navigate = useNavigate();

  // logica Roles
  const userRoles = usuario?.roles || [];
  const isAdmin = userRoles.includes("admin");
  const isEditor = userRoles.includes("editor");
  const isManager = userRoles.includes("manager");

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
            <h2 className="comp2">Panel Administrativo</h2>
          </motion.div>
          <motion.div
            className="insideDown"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* mostrando nombre del usuario */}
            <h5 className="comp2">
              {usuario?.nombre} {usuario?.apellido}
            </h5>
          </motion.div>
        </div>
      </motion.div>

      <ul className="sidebar-menu">
        {/* admin puede ver dashboard */}
        {isAdmin && (
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                >
                <NavLink className="comp" to="/dashboard">
                  Dashboard
                </NavLink>
              </motion.li>
        )}

        {/* admin puede ver "Usuarios" */}
        {isAdmin && (
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <NavLink className="comp" to="/usuarios">
              Usuarios
            </NavLink>
          </motion.li>
        )}

        {/* solo manager puede ver Sedes */}
        {isManager && (
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <NavLink className="comp" to="/sedes">
              Sedes
            </NavLink>
          </motion.li>
        )}

        {/* solo editor puede ver Noticias */}
        {isEditor && (
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <NavLink className="comp" to="/noticias">
              Noticias
            </NavLink>
          </motion.li>
        )}

        {/* solo manager pude ver Carreras */}
        {isManager && (
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <NavLink className="comp" to="/carreras">
              Carreras
            </NavLink>
          </motion.li>
        )}
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
      <motion.div
        className="toggle-button"
        onClick={handleToggleSidebar}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </div>
  );
};

export default Sidebar;
