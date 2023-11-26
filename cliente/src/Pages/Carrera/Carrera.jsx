import React, {useState, useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import NavbarDrop from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./carrera.css";
import axios from "axios";

const Carrera = () => {
  const location = useLocation();
  //const carreraData = location.state?.carreraData;
  //console.log("El carrera dataa es:",carreraData);

  const { id } = useParams();
  const [carreraData, setCarreraData] = useState({});
  const [loading, setLoading] = useState(true);

 
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
    // <div>
    //   <Navbar />
    //   <div className="containerCarrera">
    //     <div>
    //       <div class="header-contentC">
    //         <h1>Administracion de Empresas</h1>

    //         <img class="imageC" src="admi.png" alt="Descripción de la imagen" />
    //       </div>

    //       <div class="contentC">
    //         <p>
    //           Administración de Empresas de la Cato forma gerentes y
    //           emprendedores, con sólidas competencias de gestión empresarial y
    //           complementadas con habilidades blandas, para la toma decisiones en
    //           base a sólidos principios éticos.
    //         </p>

    //         <div class="image-containerC">
    //           <img
    //             class="sub-imageC"
    //             src="admiacre.png"
    //             alt="Descripción de la imagen 1"
    //           />
    //           <p class="sub-text">
    //             Acreditada por el Sistema de la Universidad Boliviana SUB.
    //           </p>
    //         </div>
    //       </div>

    //       <div class="additional-textsC">
    //         <p class="additional-textC">Duracion de carrera.</p>
    //         <p class="additional-textC">Area de Estudio.</p>
    //         <p class="additional-textC">Modalidad de Graduacion.</p>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </div>
 

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
