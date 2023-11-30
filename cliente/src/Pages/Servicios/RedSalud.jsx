import React from 'react';
import Footer from '../../Components/Footer/Footer';
import NavbarPort from '../../Components/Navbar/Navbar';
import './redsalud.css';

const RedSalud = () => {
  return (
    <div>
      <NavbarPort />
      <main>
        <h1 className='containerRS'>Servicios de Salud</h1>
        <div className="image-container">
          <div className="image-placeholder">
            <img
              src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2022/08/Comunicado-Serv.-Med.jpg?resize=700%2C700&ssl=1"
              alt="Imagen Historia"
              className="image-placeholder"
            />
          </div>
          <div className="image-placeholder"></div>
          <img
            src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2022/01/RED-SALUD.jpg?resize=700%2C700&ssl=1"
            alt="Imagen Historia"
            className="image-placeholder"
          />
        </div>

        <h1 className='containerRS'>Algunos centros de salud</h1>
        <img
          src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2021/05/Redsaludoki.png?resize=1080%2C522&ssl=1"
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
              src="https://res.cloudinary.com/dmgzswd9n/image/upload/v1701286765/hwuqzdsxxilfoeggtpd9.jpg"
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
  );
}

export default RedSalud;
