import React from 'react'
import useFetch from '../../hooks/useFetch'
import './noticias.css'

const Noticias = () => {
  const { data, loading } = useFetch("http://localhost:8800/api/noticias?destacado=true&activo=true");
  return (
    <div className="news-feed">
      {loading ? (
        "Cargando..."
      ) : (
        <>
          {data.map((item) => (
            <div className="news-card" key={item._id}>
              <img src={item.img[0]} alt={item.titulo} className="news-card__image"  />
              <div className="news-card__content">
                <h2 className="news-card__title">
                  {item.titulo}
                </h2>
                <p className="news-card__description">
                  {item.descripcion}
                </p>
                <button className='buttonVerMas'>
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>

    

    
  );
};

export default Noticias;
