import React from "react";
import "./about.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
          <div className="texto-izq">
            <p>Acerca de La U.C.B.</p>
          </div>
        <div className="texto-der">
          <p>
            "Un lugar de aprendizaje, descubrimiento, innovación, expresión y
            discurso, donde quienes se aventuran aquí se unen en la búsqueda de
            la verdad, el conocimiento y un mundo mejor, ofreciendo un ambiente
            alentador para aprender, investigar, enseñar, trabajar y crecer en
            comunidad."
          </p>
        </div>
        <div>
          <img src="https://tja.ucb.edu.bo/wp-content/uploads/2020/09/logo-UCB.png" alt="Logo Ucb" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
