import React from 'react';
import Footer from '../../Components/Footer/Footer';
import NavbarPort from '../../Components/Navbar/Navbar';
import './usei.css';

const Usei = () => {
  return (
    <div>
      <NavbarPort />
      <main>
        <h1 className='containerRF'>Unidad de Servicios de Estudiantes Inteligentes</h1>
        <div className="image-containerF">
          <div className="image-placeholderF">
            <img
              src="https://res.cloudinary.com/dmgzswd9n/image/upload/v1701143082/sqrlaerdmk9f6nsgfjc0.png"
              alt="Imagen Historia"
              className="image-placeholderF"
            />
          </div>
          <div className="image-placeholderF"></div>
          <img
            src="https://res.cloudinary.com/dmgzswd9n/image/upload/v1701143080/vuux8q6udxdirqhkhzaf.jpg"
            alt="Imagen Historia"
            className="image-placeholderF"
          />
        </div>

        <h1 className='containerRF'>Algunos Servicios Especiales</h1>
        <img
          src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2021/10/Feria-de-empleo-final.jpg?resize=678%2C387&ssl=1"
          alt="Imagen Historia"
          className="image-centerRF"
        />
      </main>
      <div>
      <h1 className='containerRF'>Con Profecionales de alta Categoria</h1>
      </div>
      <div className="image-containerF">
          <div className="image-placeholderF">
            <img
              src="https://i0.wp.com/ucblpz.com/wp-content/uploads/2018/09/DSC2432-copy.jpg?w=1080&ssl=1"
              alt="Imagen Historia"
              className="image-placeholderF"
            />
          </div>
          </div>
          <div></div>
          <div className='containerRFFF'>
      <div className='messageF'>
        No olvides contactarnos para brindarte una mejor atención con resultados bastante óptimos.
      </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Usei;