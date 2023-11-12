import React from "react";
import "./about.css";
import Navbar from "../../Components/Navbar/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div class="container">
        <div class="vertical-line">
          <div class="texto-izq">
            <p>Acerca de La U.C.B.</p>
          </div>
        </div>
        <div class="texto-der">
          <p>
            "Un lugar de aprendizaje, descubrimiento, innovación, expresión y
            discurso, donde quienes se aventuran aquí se unen en la búsqueda de
            la verdad, el conocimiento y un mundo mejor, ofreciendo un ambiente
            alentador para aprender, investigar, enseñar, trabajar y crecer en
            comunidad."
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default About;
