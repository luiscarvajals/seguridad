import React from 'react';
import Footer from '../../Components/Footer/Footer';
import NavbarPort from '../../Components/Navbar/Navbar';
import './FinUcb.css';

const FinUcb = () => {
  return (
    <div>
      <NavbarPort />
      <main>
        <h1 className='containerRS'>Servicios de Financiamineto</h1>
        <div className="image-container">
          <div className="image-placeholder">
            <img
              src="https://res.cloudinary.com/dmgzswd9n/image/upload/v1701143080/vuux8q6udxdirqhkhzaf.jpg"
              alt="Imagen Historia"
              className="image-placeholder"
            />
          </div>
          <div className="image-placeholder"></div>
          <img
            src="https://res.cloudinary.com/dmgzswd9n/image/upload/v1701142695/qu2d4w3o3ovehlptuylc.jpg"
            alt="Imagen Historia"
            className="image-placeholder"
          />
        </div>

        <h1 className='containerRS'>Brindamos la mejor asistencia y de manera presencial </h1>
        <img
          src="https://i0.wp.com/ucblpz.com/wp-content/uploads/2020/07/clinica_juridica.png?w=1080&ssl=1"
          alt="Imagen Historia"
          className="image-centerRS"
        />
      </main>
      <div>
      <h1 className='containerRS'>Con Profecionales de alta Categoria</h1>
      </div>
      <div className="image-container">
          <div className="image-placeholder">
            <img
              src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2022/10/banner-principal-se-parte.jpg?resize=1080%2C419&ssl=1"
              alt="Imagen Historia"
              className="image-placeholder"
            />
          </div>
          </div>
          <div></div>
          <div className='containerRSSS'>
      <div className='message'>
        No olvides contactarnos para brindarte una mejor atención con resultados bastante óptimos.
      </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default FinUcb