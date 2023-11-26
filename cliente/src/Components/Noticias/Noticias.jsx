import React from "react";
import "./noticias.css";

const Noticias = () => {
  //const { data, loading, error } = useFetch("/noticias?destacado=true&activo=true");
  return (
    <div className="containerNoti">
      <img
        src="https://ih1.redbubble.net/image.437035498.5712/flat,800x800,075,f.u1.jpg"
        alt="noticia1"
        className="imagenNoti"
      />
      <div className="linea-horizontalNoti"></div>

      <div className="contenido-noticiaNoti">
        <div class="texto-izqNoti">
          <p>Ejemplo1</p>
        </div>

        {/* <div className="texto-der1Noti">
          <p>
            Los ganadores al concurso de danza Los estudiantes de la universidad
            Católica Boliviana son galardonados a mejor evento de danza a nivel
            nacional y se preparan para las internacionales!.
          </p>
        </div> */}

        <a href="#" className="enlaceNoti">
          Explora esta noticia
        </a>
      </div>
    </div>

    

    
  );
};

export default Noticias;
