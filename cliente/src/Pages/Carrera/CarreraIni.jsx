import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./carreraini.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CarreraIni = () => {
  const [carrera, setCarrera] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchCarrera = async () => {
      const response = await axios.get("http://localhost:8800/api/carreras/");
      console.log("first",(response.data));
      setCarrera(response.data);
    };
    fetchCarrera();
  }, []);

  console.log(carrera);

  
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
    <div className="containerIni">
      <Navbar />
      <h1>CARRERAS</h1>
      <div className="button-container">
        {carrera.map((carrera, index) => (
          <button className="button"
          onClick={() => {
            navigate(`/carreras/${carrera._id}`, { state: { carreraData: carrera } });
          }}
        >
          {carrera.nombre}
        </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CarreraIni;
