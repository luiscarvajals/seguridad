import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./carrera.css";
import axios from "axios";
import './carrera.css';

const Carrera = () => {

  //const carreraData = location.state?.carreraData;
  //console.log("El carrera dataa es:",carreraData);

  const { id } = useParams();
  const [carreraData, setCarreraData] = useState({});


 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/carreras/${id}`);
    
        setCarreraData(response.data);
      } catch (error) {
        console.error('Error al cargar datos de la carrera:', error);
      }
    };

    fetchData();
  }, [id]);


  return (

    <div>
    <NavbarDrop />
    <div className="containerCarrera">
      <div className="header-contentC">
        <h1>{carreraData.nombre}</h1>
        <img className="imageC" src={carreraData.img} alt="Descripción de la imagen" />
      </div>
  
      <div className="contentC">
        <p>{carreraData.descripcion}</p>
      </div>
  
      <div className="additional-texts">
        <div className="text-groupC">
          <p><strong>Duración:</strong> {carreraData.duracion}</p>
          <p><strong>Área de estudio:</strong> {carreraData.categoria}</p>
          <p><strong>Modalidad de Graduación:</strong> {carreraData.modalidadGraduacion}</p>
          <p><strong>Perfil de Egreso:</strong> {carreraData.perfilEgreso}</p>
        </div>
  
        <div className="text-groupC">
          <p><strong>Perfil de Ingreso:</strong> {carreraData.perfilIngreso}</p>
          <p><strong>Plan de Estudio:</strong> {carreraData.planEstudio}</p>
          <p><strong>Campo Ocupacional:</strong> {carreraData.campoOcupacional}</p>
          <p><strong>Requisitos de Ingreso:</strong> {carreraData.requisitosIngreso}</p>
        </div>
  
        <div className="text-groupC">
          <p><strong>Título Otorga:</strong> {carreraData.tituloOtorga}</p>
          <p><strong>Sede:</strong> {carreraData.sede}</p>
          <p><strong>Contacto:</strong> {carreraData.contacto}</p>
        </div>
  
        <div className="text-groupC">
          <p><strong>Correo:</strong> {carreraData.correo}</p>
          <p><strong>Teléfono:</strong> {carreraData.telefono}</p>
          <p><strong>Docentes:</strong> {carreraData.docentes}</p>
          <p><strong>Ubicación Dirección Carrera:</strong> {carreraData.ubicacionDirCarrera}</p>
          <p><strong>Dirección Carrera:</strong> {carreraData.dirCarrera}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  

  );
};

export default Carrera;



