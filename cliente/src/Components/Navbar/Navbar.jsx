import React, { useEffect } from "react";
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const NavbarPort = () => {
  // const [, setActiveLink] = useState("inicio");
  const [isOpen, setIsOpen] = useState(false);
  const [carreraPre, setCarreraPre] = useState({});
  const [carreraPost, setCarreraPost] = useState({});
  const [sedes, setSedes] = useState({});

  // const handleLinkClick = (link) => {
  //   setActiveLink(link);
  // };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/carreras/tipo/pregrado`)
      .then((response) => {
        console.log("Carrera Response:", response.data);
        setCarreraPre(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la carrera:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/carreras/tipo/postgrado`)
      .then((response) => {
        console.log("Carrera Responsedd:", response.data);
        setCarreraPost(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la carrera:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8800/api/sedes/`)
      .then((response) => {
        console.log("Sede Response:", response.data);
        setSedes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la sede:", error);
      });
  },[]);


  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <div className="container">
    //     <NavLink className="navbar-brand" to="/">
    //       <img src="https://tja.ucb.edu.bo/wp-content/uploads/2020/09/logo-UCB.png" className="logoNav"/>
    //     </NavLink>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //       onClick={handleToggle}
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
    //       <ul className="navbar-nav ms-auto">
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/" onClick={handleToggle}>
    //             Inicio
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/carreras" onClick={handleToggle}>
    //             Carrera
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/about" onClick={handleToggle}>
    //             Nosotros
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/historia" onClick={handleToggle}>
    //             Historia
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    <Navbar bg="dark" expand="lg" variant="dark" >
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://tja.ucb.edu.bo/wp-content/uploads/2020/09/logo-UCB.png"
            className="logoNav"
            alt="UCB Logo"
          />
        </NavLink>
        <Navbar.Toggle aria-controls="navbarNav" onClick={handleToggle} />
        <Navbar.Collapse
          id="navbarNav"
          className={`justify-content-end ${isOpen ? "show" : ""}`}
        >
          <Nav>
            <NavLink className="nav-link" to="/" onClick={handleToggle}>
              Inicio
            </NavLink>

            <NavDropdown title="Pregrado" id="basic-nav-dropdown">
              {Array.isArray(carreraPre) &&
                carreraPre.map((carrera) => (
                  <NavDropdown.Item
                    key={carrera._id}
                    href={`/carreras/${carrera._id}`}
                  >
                    {carrera.nombre}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>

            <NavDropdown title="Postgrado" id="basic-nav-dropdown">
              {Array.isArray(carreraPost) &&
                carreraPost.map((carrera) => (
                  <NavDropdown.Item key={carrera._id} href={`/carreras/${carrera._id}`}>
                    {carrera.nombre}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>

            <NavDropdown title="Servicios" id="basic-nav-dropdown">
              <NavDropdown.Item href="/usei">Servicio de USEI</NavDropdown.Item>
              <NavDropdown.Item href="/finucb">Financiamiento UCB</NavDropdown.Item>
              <NavDropdown.Item href="/redsalud">Red Salud</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Sedes" id="basic-nav-dropdown">
              {Array.isArray(sedes) &&
                sedes.map((sede) => (
                  <NavDropdown.Item key={sede._id} href={`/sedes/${sede._id}`}>
                    {sede.ciudad}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>

            <NavLink className="nav-link" to="/about" onClick={handleToggle}>
              Nosotros
            </NavLink>
            <NavLink className="nav-link" to="/historia" onClick={handleToggle}>
              Historia
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarPort;
