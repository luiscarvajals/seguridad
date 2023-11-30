import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./sedesini.css";
import ImageCarousel from "../../Components/Carousel/Carousel";

const SedesIni = () => {
  const { id } = useParams();
  const [sede, setSede] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarrera = async () => {
      const response = await axios.get(`http://localhost:8800/api/sedes/${id}`);
      console.log("sedesssss", response.data);
      setSede(response.data);
    };
    fetchCarrera();
  }, []);

  /* <h1>CARRERAS</h1>
        <div class="button-container">
        
            <div class="button" id="button1">Administracion de Empresas</div>
            <div class="button" id="button2">Contaduria Publica</div>
            <div class="button" id="button3">Administracion Turistica</div>
            <div class="button" id="button4">Ingenieria Comercial</div>
            <div class="button" id="button5">Ingenieria de Sistemas</div>
            <div class="button" id="button6">Ingenieria Civil</div>
            <div class="button" id="button7">Ingenieria Biomedica</div>
            <div class="button" id="button8">Ingenieria Industrial</div>
            <div class="button" id="button9">Comunicacion Social</div>
            <div class="button" id="button10">Psicologia</div>
            <div class="button" id="button11">Arquitectura</div>
            <div class="button" id="button12">Diseño Digital</div>
            <div class="button" id="button13">Arquitectura de Interiores</div>
            <div class="button" id="button14">Diseño Grafico</div>
            <div class="button" id="button15">Ciencias Politicas</div>
            <div class="button" id="button16">Derecho</div>
           
        </div> */

  return (
    <div>
      <NavbarDrop />
      <div className="containerCarrera">
        <div className="hedaerC">
          <h1>{sede.nombre}</h1>
        </div>
        <div className="carrera-image">
          {sede && sede.img && sede.img.length > 0 ? (
            <ImageCarousel images={sede.img} />
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </div>

        <div className="carrera-contact">
          <h2 className="h2C">Contacto</h2>
          <div className="contact-info">
            <div className="info-item">
              <strong>Correo:</strong> {sede.email}
            </div>

            <div className="info-item">
              <strong>Teléfono:</strong> {sede.telefono}
            </div>

            <div className="info-item">
              <strong>Dirección:</strong> {sede.calle} #{sede.numero}{" "}
              {sede.ciudad}
            </div>
            <div className="info-item2">
              <button className="buttonSede">
                <a className="linkSede"
                  href="https://lpz.ucb.edu.bo/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Más!
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SedesIni;
