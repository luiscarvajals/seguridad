import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import axios from 'axios';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNoticias = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/noticias?destacado=true&activo=true");
        setNoticias(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getNoticias();
  }, []);


  return (
    <div className="fp">
      {loading ? (
        "Cargando..."
      ) : (
        <>
          {noticias.map((noticia) => (
            <div className="fpItem" key={noticia._id}>
              {/* <img src={noticia.imagenes[0]} alt="" className="fpImg" /> */}
              <span className="fpTipo">
                <strong>Título</strong> {noticia.titulo}
              </span>
              <div>
                <span className="fpPuntuacion">
                  {" "}
                  <strong>Descripción:</strong> {noticia.descripcion}
                </span>
              </div>
              
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Noticias