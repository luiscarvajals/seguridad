import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './carrera.css';

const Carrera = () => {
  return (
    <div>
      <Navbar />
      <div className='containerCarrera'>
        <div>
        
    
        <div class="header-content">
            <h1>Administracion de Empresas</h1>
            
            <img class="image" src="admi.png" alt="Descripción de la imagen"/>
        </div>

    <div class="content">
      
        <p>Administración de Empresas de la Cato forma gerentes y emprendedores, con sólidas competencias de gestión empresarial y complementadas con habilidades blandas, para la toma decisiones en base a sólidos principios éticos.</p>
        
        
        <div class="image-container">
            <img class="sub-image" src="admiacre.png" alt="Descripción de la imagen 1"/>
            <p class="sub-text">Acreditada por el Sistema de la Universidad Boliviana SUB.</p>
        </div>
    </div>

 
    <div class="additional-texts">
        <p class="additional-text">Duracion de carrera.</p>
        <p class="additional-text">Area de Estudio.</p>
        <p class="additional-text">Modalidad de Graduacion.</p>
    </div>
</div>

        
      </div>
      <Footer/>
    </div>
  )
}

export default Carrera