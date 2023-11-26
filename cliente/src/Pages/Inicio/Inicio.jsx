import React from "react";
import NavbarPort from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Noticias from "../../Components/Noticias/Noticias";
import Carrera from "../Carrera/Carrera";
import CarreraIni from "../Carrera/CarreraIni";

const Inicio = () => {
  return (
    <div>
      <NavbarPort />
      <div className="contHome">
        <h1 className="tituloHome">
          Universidad Católica Boliviana "San Pablo"
        </h1>
        <p className="parrafoHome">
          En este sitio web podras encontrar informacion relevante sobre la
          carrera, asi como tambien podras consultar los horarios de las
          materias, los profesores que imparten las materias, los grupos de cada
          materia, y las calificaciones de los alumnos.
        </p>
        <p className="parrafoHome">
          Para poder acceder a la informacion de los alumnos, profesores y
          materias, es necesario que inicies sesion con tu cuenta de correo
          institucional.
        </p>
        <p className="parrafoHome">
          Si no tienes una cuenta de correo institucional, puedes registrarte en
          la opcion de registro, donde podras crear una cuenta de correo
          institucional.
        </p>
        <p className="parrafoHome">
          Si ya tienes una cuenta de correo institucional, puedes iniciar sesion
          en la opcion de inicio de sesion, donde podras ingresar a la
          informacion de los alumnos, profesores y materias.
        </p>
      </div>
      <div>
     
        <Noticias />
      </div>
      <div>

        <CarreraIni />
      </div>
      <Footer />
    </div>
  );
};

export default Inicio;
