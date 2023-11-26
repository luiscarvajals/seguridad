import React from 'react'
import useFetch from '../../hooks/useFetch'

const Noticias = () => {
  const { data, loading, error } = useFetch("/noticias?destacado=true&activo=true");
  return (
    <div className="fp">
      {loading ? (
        "Cargando..."
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.imagenes[0]} alt="" className="fpImg" />
              <span className="fpTipo">
                <strong>Título</strong> {item.titulo}
              </span>
              {/* <div className="fpCategory">
                <strong>Categoría: </strong>
                {Array.from(
                  { length: getStarRating(item.categoria) },
                  (_, index) => (
                    <FaStar key={index} />
                  )
                )}
              </div> */}

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
