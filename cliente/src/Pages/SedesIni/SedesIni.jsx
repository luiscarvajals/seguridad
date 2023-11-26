import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";



const SedesIni = () => {
    const { id } = useParams();
  const [sede, setSede] = useState({});

  const navigate=useNavigate();

  useEffect(() => {
    const fetchCarrera = async () => {
      const response = await axios.get(`http://localhost:8800/api/sedes/${id}`);
      console.log("sedesssss",response.data)
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
      <div className="header-contentC">
        <h1>{sede.nombre}</h1>
        <img className="imageC" src={sede.img} alt="Descripción de la imagen" />
      </div>
  
      <div className="contentC">
        <p>{sede.descripcion}</p>
      </div>
  
      <div className="additional-texts">
        <div className="text-groupC">
          <p><strong>Duración:</strong> {sede.duracion}</p>
          <p><strong>Área de estudio:</strong> {sede.categoria}</p>
          <p><strong>Modalidad de Graduación:</strong> {sede.modalidadGraduacion}</p>
          <p><strong>Perfil de Egreso:</strong> {sede.perfilEgreso}</p>
        </div>
  
        <div className="text-groupC">
          <p><strong>Perfil de Ingreso:</strong> {sede.perfilIngreso}</p>
          <p><strong>Plan de Estudio:</strong> {sede.planEstudio}</p>
          <p><strong>Campo Ocupacional:</strong> {sede.campoOcupacional}</p>
          <p><strong>Requisitos de Ingreso:</strong> {sede.requisitosIngreso}</p>
        </div>
  
        <div className="text-groupC">
          <p><strong>Título Otorga:</strong> {sede.tituloOtorga}</p>
          <p><strong>Sede:</strong> {sede.sede}</p>
          <p><strong>Contacto:</strong> {sede.contacto}</p>
        </div>
  
        <div className="text-groupC">
          <p><strong>Correo:</strong> {sede.correo}</p>
          <p><strong>Teléfono:</strong> {sede.telefono}</p>
          <p><strong>Docentes:</strong> {sede.docentes}</p>
          <p><strong>Ubicación Dirección Carrera:</strong> {sede.ubicacionDirCarrera}</p>
          <p><strong>Dirección Carrera:</strong> {sede.dirCarrera}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  
  );
};

export default SedesIni;
