import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Noticia = ({ inputs, title }) => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  const navigate = useNavigate();

  const [sedes, setSedes] = useState([]);
  const [selectedSede, setSelectedSede] = useState("");

  const [graduaciones, setGraduaciones] = useState([]);
  const [selectedGraduacion, setSelectedGraduacion] = useState([]);

  const [categorias, setCategorias] = useState("");

  useEffect(() => {
    const cargarSedes = async () => {
      try {
        const response = await axios.get("/sedes");
        setSedes(response.data);
      } catch (error) {
        console.error("Error al cargar sedes:", error.message);
      }
    };

    cargarSedes();
  }, []);

  useEffect(() => {
    const cargarGrad = async () => {
      try {
        const response = await axios.get("/graduaciones/obtener");
        setGraduaciones(response.data);
      } catch (error) {
        console.error("Error al cargar sedes:", error.message);
      }
    };
    cargarGrad();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (id !== 'categoria') {
      setInfo((prev) => ({ ...prev, [id]: value }));
    } else {
      // Para la categoría, actualiza el estado con el valor seleccionado
      setInfo((prev) => ({ ...prev, [id]: value }));
    }

    if (type === 'checkbox' && id === 'graduacion') {
      if (checked) {
        setSelectedGraduacion((prev) => [...prev, value]);
        return;
      } else {
        setSelectedGraduacion((prev) => prev.filter((graduacion) => graduacion !== value));
        return;
      }
    }

    if (id === "sede") {
      setSelectedSede(value);
    }
    if (id === "graduacion") {
      setSelectedGraduacion(value);
    }


    if (id === "duracion") {
      const duracionValue = parseInt(value);
      if (duracionValue < 1 || duracionValue > 5) {
        toast.error(
          "El precio debe ser positivo o no debe ser mayor a 5 años",
          {
            duration: 5000, // Duración en milisegundos
            position: "top-center", // Posición del mensaje en la pantalla
            style: {
              background: "red", // Color de fondo del mensaje
              color: "white", // Color del texto del mensaje
              fontWeight: "bold", // Grosor del texto
              borderRadius: "10px", // Borde redondeado
              boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)", // Sombra
              width: "350px", // Ancho del mensaje
              height: "90px", // Alto del mensaje
            },
          }
        );
        return;
      }
    }
    if (id === "telefono") {
      const telefonoValue = parseInt(value);
      if (telefonoValue < 10000000 || telefonoValue > 99999999) {
        toast.error("El teléfono debe tener 8 dígitos", {
          duration: 5000, // Duración en milisegundos
          position: "top-center", // Posición del mensaje en la pantalla
          style: {
            background: "red", // Color de fondo del mensaje
            color: "white", // Color del texto del mensaje
            fontWeight: "bold", // Grosor del texto
            borderRadius: "10px", // Borde redondeado
            boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)", // Sombra
            width: "350px", // Ancho del mensaje
            height: "90px", // Alto del mensaje
          },
        });
        return;
      }
    }
    setInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFileChange = (e) => {
    console.log("Archivos seleccionados:", e.target.files);
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles);

    const imagePreviews = selectedFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    setPreviewImages(imagePreviews);
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const list = await Promise.all(
      Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dwwj8mhse/image/upload",
          data
        );

        const { secure_url } = uploadRes.data; // URL de la imagen subida a Cloudinary
        return secure_url;
      })
    );

    const nuevaCarrera = {
      ...info,
      img: list,
      modalidadGraduacion: selectedGraduacion,

    };
    try {
      console.log("Datos de la nueva noticia:", nuevaCarrera);
      await axios.post("/carreras/", nuevaCarrera);
      toast.success("Creación exitosa!", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#27D23C",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)",
          width: "300px",
          height: "50px",
        },
      });
      setTimeout(() => {
        navigate("/carreras");
      }, 1200);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const errorMessage = err.response.data.message;
        if (errorMessage === "La noticia ya existe") {
          toast.error("La noticia ya está en uso", {
            duration: 5000,
            position: "top-center",
            style: {
              background: "#FFB517",
              color: "#3F3F3F",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)",
              width: "300px",
              height: "50px",
            },
          });
        }
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <strong>
                <label>Subir Imágenes:</label>
              </strong>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  onChange={handleFileChange}
                  multiple // Permitir selección múltiple de archivos
                />
                {previewImages.map((preview, index) => (
                  <div key={index}>
                    <img
                      src={preview}
                      alt={`Vista previa de la imagen ${index + 1}`}
                      style={{ width: "200px" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                    >
                      Eliminar Imagen
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleClick}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
  <label>Categoría</label>
  <select id="categoria" onChange={handleChange} required>
    <option value="">Seleccione una opción</option>
    <option value="Pregrado">Pregrado</option>
    <option value="Postgrado">Postgrado</option>
  </select>
</div>

              <div className="formInput">
                <label>Sede</label>
                <select
                  id="sede"
                  onChange={handleChange}
                  value={selectedSede}

                  required
                >
                  <option value="">Seleccione una opción</option>
                  {sedes.map((sede) => (
                    <option key={sede._id} value={sede.ciudad}>
                      {sede.ciudad}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
              <label>Modalidad Graduación</label>
  {graduaciones.map((graduacion) => (
    <div key={graduacion._id}>
      <input
        type="checkbox"
        id="graduacion"
        value={graduacion.nombre}
        checked={selectedGraduacion.includes(graduacion.nombre)}
        onChange={handleChange}
      />
      <label>{graduacion.nombre}</label>
    </div>
  ))}
              </div>
              <div className="formInput">
                <label>Destacada</label>
                <select id="destacada" onChange={handleChange} required>
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="formInput">
                <label>Activo</label>
                <select id="activo" onChange={handleChange} required>
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <button type="submit">Registrar</button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Noticia;
