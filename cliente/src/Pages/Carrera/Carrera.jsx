import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./carrera.css";
import axios from "axios";
import "./carrera.css";
import ImageCarousel from "../../Components/Carousel/Carousel";

const Carrera = () => {
  //const carreraData = location.state?.carreraData;
  //console.log("El carrera dataa es:",carreraData);

  const { id } = useParams();
  const [carreraData, setCarreraData] = useState({});

  const images = [
    "https://res.cloudinary.com/dwwj8mhse/image/upload/v1701058278/Banner2_hbbkq4.png",
    "https://www.la-razon.com/wp-content/uploads/2022/11/01/14/Universidad-Catolica-San-Pablo-scaled.jpg",
    "https://res.cloudinary.com/dwwj8mhse/image/upload/v1701057948/Banner1_jblowc.png",
  ];

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
    <div >
      <NavbarDrop />
      <div className="containerCarrera">
        <div className="hedaerC">
          <h1>{carreraData.nombre}</h1>
        </div>
        <div className="carrera-image">
          {carreraData && carreraData.img && carreraData.img.length > 0 ? (
            <ImageCarousel images={carreraData.img} />
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </div>
        <div className="carrera-description">
          <p>{carreraData.descripcion}</p>
        </div>
        <div className="carrera-content">
          <div className="carrera-details">
            <div className="detail-item">
              <strong>Duración (años):</strong> {carreraData.duracion}
            </div>

            <div className="detail-item">
              <strong>Área de estudio:</strong> {carreraData.categoria}
            </div>

            <div className="detail-item">
  <strong>Modalidad de Graduación:</strong>{" "}
  {carreraData.modalidadGraduacion && carreraData.modalidadGraduacion.length > 0 ? (
    carreraData.modalidadGraduacion.join(', ')
  ) : (
    'No hay información disponible'
  )}
</div>


            <div className="detail-item">
              <strong>Perfil de Egreso:</strong> {carreraData.perfilEgreso}
            </div>

            <div className="detail-item">
              <strong>Perfil de Ingreso:</strong> {carreraData.perfilIngreso}
            </div>
          </div>
          <div className="detail-item2">
            <img src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2020/11/logo-sub.png?resize=300%2C282&ssl=1" />
          </div>
        </div>
      </div>

      <div className="carrera-contact">
        <h2 className="h2C">Contacto</h2>
        <div className="contact-info">
          <div className="info-item">
            <strong>Correo:</strong> {carreraData.correo}
          </div>

          <div className="info-item">
            <strong>Teléfono:</strong> {carreraData.telefono}
          </div>

          <div className="info-item">
            <strong>Dirección:</strong> {carreraData.ubicacionDirCarrera}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Carrera;
