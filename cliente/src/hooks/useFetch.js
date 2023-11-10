import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        if (res.data.length === 0) {
          toast.error("No se encontraron resultados");
        }
      } catch (err) {
        setError(err);
        toast.error("Error al buscar resultados");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      
      if (res.data.length === 0) {
        toast.error("No se encontraron resultados relacionados a tus preferencias",{
            duration: 100, // Duración en milisegundos
            position: "top-center", // Posición del mensaje en la pantalla
            style: {
              background: "red", // Color de fondo del mensaje
              color: "white", // Color del texto del mensaje
              fontWeight: "bold", // Grosor del texto
              borderRadius: "10px", // Borde redondeado
              boxShadow: "0 20px 12px rgba(0, 0, 0, 1.4)", // Sombra
              width: "380px", // Ancho del mensaje
              height: "110px", // Alto del mensaje
              textAlign:"left",
            },
        });;
      }
    } catch (err) {
      setError(err);
      toast.error("Error al buscar según tus preferencias",{
        duration: 100, // Duración en milisegundos
        position: "top-center", // Posición del mensaje en la pantalla
        style: {
          background: "red", // Color de fondo del mensaje
          color: "white", // Color del texto del mensaje
          fontWeight: "bold", // Grosor del texto
          borderRadius: "10px", // Borde redondeado
          boxShadow: "0 20px 12px rgba(0, 0, 0, 1.4)", // Sombra
          width: "350px", // Ancho del mensaje
          height: "110px", // Alto del mensaje
        },
    });;
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;