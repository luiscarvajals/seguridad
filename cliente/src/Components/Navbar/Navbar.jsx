import React from "react";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("inicio");
  // const navigate = useNavigate();

  // const handleCarrera = () => {
  //   navigate("/carrera");
  // };
  // const handleAbout = () => {
  //   navigate("/about");
  // };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <nav>
      <NavLink>Portal Web</NavLink>
      <ul className="navbar-nav ms-auto">
        <li className={`nav-item ${activeLink === "inicio" ? "active" : ""}`}>
          <a
            className="nav-link"
            href="/"
            onClick={() => handleLinkClick("inicio")}
          >
            Inicio
          </a>
        </li>
        <li className={`nav-item ${activeLink === "carrera" ? "active" : ""}`}>
          <a
            className="nav-link"
            href="/carrera"
            onClick={() => handleLinkClick("carrera")}
          >
            Carrera
          </a>
        </li>
        <li className={`nav-item ${activeLink === "nosotros" ? "active" : ""}`}>
          <a
            className="nav-link"
            href="/about"
            onClick={() => handleLinkClick("nosotros")}
          >
            Nosotros
          </a>
        </li>
        <li className={`nav-item ${activeLink === "historia" ? "active" : ""}`}>
          <a
            className="nav-link"
            href="/historia"
            onClick={() => handleLinkClick("historia")}
          >
            Historia
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
