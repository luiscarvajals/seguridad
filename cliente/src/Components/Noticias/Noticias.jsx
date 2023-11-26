import React from 'react'
import useFetch from '../../hooks/useFetch'
import './noticias.css'

const Noticias = () => {
  const { data, loading } = useFetch("http://localhost:8800/api/noticias?destacado=true&activo=true");
  return (
    <div className="fp">
      {loading ? (
        "Cargando..."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.img[0]} alt="" className="fpImg" />
              <span className="fpTipo">
                <strong>Título</strong> {item.titulo}
              </span>
              <div>
                <span className="fpPuntuacion">
                  {" "}
                  <strong>Descripción:</strong> {item.descripcion}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>

    

    
  );
};

export default Noticias;
