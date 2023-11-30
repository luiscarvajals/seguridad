import React, { useEffect, useState } from "react";
import "./carreraini.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarreraIni = () => {
  const [carrera, setCarrera] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchCarrera = async () => {
      const response = await axios.get("http://localhost:8800/api/carreras/tipo/pregrado");
      console.log("first",(response.data));
      setCarrera(response.data);
    };
    fetchCarrera();
  }, []);

  console.log(carrera);

  return (
    <div className="containerIni">
      <h1>PREGRADO</h1>
      <div className="button-container">
        {carrera.map((carrera, index) => (
          <button className="button"
          onClick={() => {
            navigate(`/carreras/${carrera._id}`, { state: { carreraData: carrera } });
          }}
        >
          {carrera.nombre}
        </button>
        ))}
      </div>
    </div>
  );
};

export default CarreraIni;
