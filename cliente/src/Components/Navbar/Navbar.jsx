import React from "react";
import "./navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("inicio");
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="https://tja.ucb.edu.bo/wp-content/uploads/2020/09/logo-UCB.png" className="logoNav"/>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handleToggle}>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carreras" onClick={handleToggle}>
                Carrera
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={handleToggle}>
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/historia" onClick={handleToggle}>
                Historia
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  );
};

export default Navbar;
