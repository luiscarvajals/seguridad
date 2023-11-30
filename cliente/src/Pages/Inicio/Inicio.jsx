import React from "react";
import NavbarPort from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Noticias from "../../Components/Noticias/Noticias";
import './inicio.css'; // Importa el archivo CSS si no lo has hecho aún
import CarreraIni from "../Carrera/CarreraIni";
import ImageCarousel from "../../Components/Carousel/Carousel";

const Inicio = () => {
  const images = [
    'https://res.cloudinary.com/dwwj8mhse/image/upload/v1701058278/Banner2_hbbkq4.png',
    'https://www.la-razon.com/wp-content/uploads/2022/11/01/14/Universidad-Catolica-San-Pablo-scaled.jpg',
    'https://res.cloudinary.com/dwwj8mhse/image/upload/v1701057948/Banner1_jblowc.png',
  ];

  const sedesData = [
    { title: "Sede La Paz", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/zujy24moayfzlkop0cap.jpg')" },
    { title: "Sede Cochabamba", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/h71od4quzlmnnpidb9cx.jpg')" },
    { title: "Sede Tarija", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/cjxxiq82d54cm0rxpf5q.jpg')" },
    { title: "Sede Santa Cruz", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/wcrlocmkni5pgewf6amj.jpg')" },
    { title: "Sede la Plata", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/qiyahldgmdmbfv8ivwce.jpg')" },
    { title: "Escuela de la produccion y la competividad", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/ap4fsoh6npdctkkh78lz.jpg')" },
    { title: "U.C.B Oruro Virgen del Socabon", background: "url('https://res.cloudinary.com/dbw9a0kxn/image/upload/v1701309351/sussileeqe22r12ntwqu.jpg')" },
  ];

  const handleNavigate = () => {
    window.location.href = "/noticias";
  }

  
  return (
    <div>
      <NavbarPort />
      <div className="contHome">
        <div className="video-container">
          <video
            src="https://res.cloudinary.com/dbw9a0kxn/video/upload/v1701227452/fondito_cato_jxmxtt.mp4"
            type="video/mp4"
            muted={true}
            loop={true}
            autoPlay={true}
            className="video"
          ></video>
          <div className="textOverlay">
            <h1 className="tituloHome">
              Universidad Católica Boliviana "San Pablo"
            </h1>
            <p className="parrafoHome">
              Únase a nosotros para celebrar el Modelo Institucional de la
              Universidad Católica Boliviana "San Pablo" (U.C.B.) 2023 y
              descargue los modelos institucionales que han guiado nuestro
              compromiso con la excelencia académica y la educación superior en
              Bolivia durante casi cuatro décadas.
            </p>
            <button className="learn-more" onClick={handleNavigate}>
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Conoce más</span>
            </button>
          </div>
        </div>
      </div>
      <div><h1>Noticias: UCB en Línea</h1></div>
      <div>
        <Noticias />
      </div>
      <div>
        <CarreraIni />
      </div>

      <div>
        <h1>Sedes ACADEMICAS</h1>
      </div>
      <div className="containerInicio">
        {sedesData.map((sede, index) => (
          <div
            className="card"
            key={index}
            style={{ background: sede.background }}
          >
            <p className="title">{sede.title}</p>
            <div className="card-hidden">
              <p className="title-in">{sede.title}</p>
              {/* <a className="button">Button</a> */}
            </div>
          </div>
        ))}
        <div className="card-border"></div>
      </div>

      <div>
        <ImageCarousel images={images} />
      </div>
      <Footer />
    </div>
  );
};

export default Inicio;