import React, { useEffect, useState } from 'react'
import './noticias.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Noticias = () => {
  const [noticia, setNoticia] = useState([]);
  const navigate=useNavigate();

  useEffect(() => { 
    const fetchNoticia = async () => {
      const response = await axios.get("http://localhost:8800/api/noticias/activo/destacada");
      console.log("first",(response.data));
      setNoticia(response.data);
    };
    fetchNoticia();
  }, []);



  return (
    <div className="news-feed">
          {noticia.map((noticia) => (
            <div className="news-card" key={noticia._id}>
              <img src={noticia.img[0]} alt={noticia.titulo} className="news-card__image"  />
              <div className="news-card__content">
                <h2 className="news-card__title">
                  {noticia.titulo}
                </h2>
                <p className="news-card__description">
                  {noticia.descripcion}
                </p>
                <button className='buttonVerMas' onClick={() => {
            navigate(`/noticias/${noticia._id}`, { state: { noticiaData: noticia }}
            );
          }}
          >
                  Ver más
                </button>
              </div>
            </div>
          ))}
    </div>

    

    
  );
};

export default Noticias;
