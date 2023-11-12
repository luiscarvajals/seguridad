import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="rosa">
       
        <div className="texto-izq1">
          <p>TAMBIÉN TE PUEDE INTERESAR</p>
        </div>
        <div className="texto-izq2">
          <p>Temas destacados relacionados</p>
        </div>
        
      </div>
      <div className="fondo-negro">
        <div className="columna">
          <strong><p>ACERCA DE NOSOTROS</p></strong>
          <a href="#">• La U.C.B.</a>
          <a href="#">• Misión, Visión e Identidad Católica</a>
          <a href="#">• CEB y Junta Directiva</a>
          <a href="#">• Rectorado Nacional</a>
          <a href="#">• Materiales</a>
          <a href="#">• Documentos</a>
        </div>
        <div className="columna">
          <strong><p>FORMACIÓN</p> </strong>
          <a href="#">• Pre Grado</a>
          <a href="#">• Post Grado</a>
        </div>
        <div className="columna">
        <strong><p>INVESTIGACIÓN</p> </strong>
          <a href="#">• Unidades de Investigación U.C.B</a>
          <a href="#">• Principales Publicaciones</a>
          <a href="#">• Biblioteca U.C.B.</a>
        </div>
        <div className="columna">
        <strong><p>UNIDADES ACADÉMICAS</p> </strong>
          <a href="#">• Sede La Paz</a>
          <a href="#">• Sede Cochabamba</a>
          <a href="#">• Sede Santa Cruz</a>
          <a href="#">• Sede Tarija</a>
          <a href="#">• Sede Sucre</a>
          <a href="#">• Escuela de la producción y competitividad</a>
        </div>
      </div>
      {/* <img className="imagen" src="ucbrem.png" alt="Imagen de ejemplo" /> */}
      <div className="rectangulo-1"></div>
      <div className="rectangulo-2"></div>
      <div className="rectangulo-3"></div>
      <div className="rectangulo-4"></div>
      <div className="rectangulo-5"></div>
      <div className="derechos-reservados">© Todos los Derechos Reservados 2023</div>
      <div className="enlaces-sociales">
        <a href="#">Facebook</a>
        <a href="#">YouTube</a>
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
      </div>
    </footer>
  );
};

export default Footer;
