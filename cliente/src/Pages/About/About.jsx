import React from 'react'
import './about.css'
import Navbar from '../../Components/Navbar/Navbar'

const About = () => {
  return (
    <div>
     <div><Navbar /></div>
  
      <img src="https://res.cloudinary.com/dwwj8mhse/image/upload/v1699753553/kavonkcwybqnowibs4tw.jpg" alt="Logo de la U.C.B." class="logo"/>
    <div class="vertical-line">
    <div class="texto-izq">
        <p>Acerca de La U.C.B.</p>
    </div>
    </div>
    <div class="texto-der">
        <p>"Un lugar de aprendizaje, descubrimiento, 
            innovación, expresión y discurso, 
            donde quienes se aventuran aquí se unen 
            en la búsqueda de la verdad, el conocimiento 
            y un mundo mejor, ofreciendo un ambiente 
            alentador para aprender, investigar, 
            enseñar, trabajar y crecer en comunidad."</p>
    </div>
    </div>
  )
}

export default About