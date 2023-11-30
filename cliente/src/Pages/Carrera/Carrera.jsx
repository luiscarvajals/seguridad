import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./carrera.css";
import axios from "axios";
import "./carrera.css";

const Carrera = () => {
  //const carreraData = location.state?.carreraData;
  //console.log("El carrera dataa es:",carreraData);

  const { id } = useParams();
  const [carreraData, setCarreraData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/carreras/${id}`
        );

        setCarreraData(response.data);
      } catch (error) {
        console.error("Error al cargar datos de la carrera:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="career-details-container">
  <NavbarDrop />

  <div className="career-details-content">
    <header className="career-details-header">
      <h1 className="career-details-title">{carreraData.nombre}</h1>
      <img className="career-details-image" src={carreraData.img} alt="Imagen de la carrera" />
    </header>

    <section className="career-details-description">
      <p>{carreraData.descripcion}</p>
    </section>

    <section className="career-details-info">
      <div className="info-item">
        <strong>Duración:</strong> {carreraData.duracion}
      </div>

      <div className="info-item">
        <strong>Área de estudio:</strong> {carreraData.categoria}
      </div>

      <div className="info-item">
        <strong>Modalidad de Graduación:</strong> {carreraData.modalidadGraduacion}
      </div>

      <div className="info-item">
        <strong>Perfil de Egreso:</strong> {carreraData.perfilEgreso}
      </div>

      <div className="info-item">
        <strong>Perfil de Ingreso:</strong> {carreraData.perfilIngreso}
      </div>

      <div className="info-item">
        <strong>Plan de Estudio:</strong> {carreraData.planEstudio}
      </div>

      <div className="info-item">
        <strong>Campo Ocupacional:</strong> {carreraData.campoOcupacional}
      </div>

      <div className="info-item">
        <strong>Requisitos de Ingreso:</strong> {carreraData.requisitosIngreso}
      </div>

      <div className="info-item">
        <strong>Título Otorga:</strong> {carreraData.tituloOtorga}
      </div>

      <div className="info-item">
        <strong>Sede:</strong> {carreraData.sede}
      </div>

      <div className="info-item">
        <strong>Contacto:</strong> {carreraData.contacto}
      </div>

      <div className="info-item">
        <strong>Correo:</strong> {carreraData.correo}
      </div>

      <div className="info-item">
        <strong>Teléfono:</strong> {carreraData.telefono}
      </div>

      <div className="info-item">
        <strong>Docentes:</strong> {carreraData.docentes}
      </div>

      <div className="info-item">
        <strong>Ubicación Dirección Carrera:</strong> {carreraData.ubicacionDirCarrera}
      </div>

      <div className="info-item">
        <strong>Dirección Carrera:</strong> {carreraData.dirCarrera}
      </div>
    </section>
  </div>

  <Footer />
</div>

  );
};

export default Carrera;
