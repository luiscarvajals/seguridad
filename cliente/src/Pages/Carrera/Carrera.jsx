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
      <div className="header-contentCarrera">
        <h1>{carreraData.nombre}</h1>
        <img className="imageCarrera" src={carreraData.img} alt="Descripción de la imagen" />
      </div>
  
      <div className="contentCarrera">
        <p>{carreraData.descripcion}</p>
      </div>
  
      <div className="additional-textsCarrera">
      
  <div className="text-groupCarrera">
    {/* Agrega la clase .bg-azul para el fondo azul */}
    <p className="bg-azul"><strong>Duración:</strong> {carreraData.duracion}</p>
    <p className="bg-azul"><strong>Área de estudio:</strong> {carreraData.categoria}</p>
    <p className="bg-azul"><strong>Modalidad de Graduación:</strong> {carreraData.modalidadGraduacion}</p>
    <p className="bg-azul"><strong>Perfil de Egreso:</strong> {carreraData.perfilEgreso}</p>
  </div>
  
  <div className="text-groupCarrera">
  {/* Aplica la clase bg-azul-claro para el fondo azul claro */}
  <p><span className="bg-azul-claro"><strong>Título Otorga:</strong> {carreraData.tituloOtorga}</span></p>
  <p><span className="bg-azul-claro"><strong>Sede:</strong> {carreraData.sede}</span></p>
  <p><span className="bg-azul-claro"><strong>Contacto:</strong> {carreraData.contacto}</span></p>
</div>
  
      
        <div className="text-groupCarrera">
          <p><strong>Correo:</strong> {carreraData.correo}</p>
          <p><strong>Teléfono:</strong> {carreraData.telefono}</p>
          <p><strong>Docentes:</strong> {carreraData.docentes}</p>
          <p><strong>Ubicación Dirección Carrera:</strong> {carreraData.ubicacionDirCarrera}</p>
          <p><strong>Dirección Carrera:</strong> {carreraData.dirCarrera}</p>
        </div>
        <div> 
          <img src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2023/01/web-Acreditada-Arcu-Sur.jpg?resize=700%2C700&ssl=1"/>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  

  );
};

export default Carrera;



