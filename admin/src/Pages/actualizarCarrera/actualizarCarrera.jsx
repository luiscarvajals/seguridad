import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "./actualizarCarrera.css";

const ActualizarCarrera = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [carrera, setCarrera] = useState({});
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [deletedImages] = useState([]);

  const [sedes, setSedes] = useState([]);
  const [graduaciones, setGraduaciones] = useState([]);

  const [selectedGraduacion, setSelectedGraduacion] = useState([]);

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

  useEffect(() => {
    axios
      .get(`/carreras/${id}`)
      .then((response) => {
        //console.log("Carrera Response:", response.data);
        setCarrera(response.data);
        if (Array.isArray(response.data.img)) {
          setPreviewImages(response.data.img);
        }
        const modalidadesSeleccionadas =
          response.data.modalidadGraduacion || [];
        console.log("Modalidades Seleccionadas:", modalidadesSeleccionadas);
        setSelectedGraduacion(modalidadesSeleccionadas);
      })
      .catch((error) => {
        console.error("Error al obtener la carrera:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
  
    let newValue;
  
    if (type === "number") {
      // Validar que el valor sea al menos 1 para inputs de tipo "number"
      newValue = value < 1 ? 1 : parseInt(value);
    } else {
      newValue = value;
    }
  
    if (type === "checkbox" && id.startsWith("modalidadGraduacion")) {
      setSelectedGraduacion((prevSelected) => {
        if (checked) {
          return [...prevSelected, value];
        } else {
          return prevSelected.filter((graduacion) => graduacion !== value);
        }
      });
    } else {
      setInfo((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : newValue,
      }));
    }
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
    if (carrera && carrera.img && carrera.img.length > 0) {
      const updatedImages = carrera.img.filter((carrera, i) => i !== index);

      setCarrera({ ...carrera, img: updatedImages });
      setPreviewImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dwwj8mhse/image/upload",
            data
          );

          const { url } = uploadRes.data; //subir imagen a cloudinary
          return url;
        })
      );
      // Eliminar imágenes seleccionadas
      if (deletedImages.length > 0) {
        carrera.imagenes = carrera.imagenes.filter(
          (image) => !deletedImages.includes(image)
        );
      }
      const datosActualizados = {
        ...info,
        img: carrera.img ? [...carrera.img, ...list] : list,
        modalidadGraduacion: selectedGraduacion,
      };
      await axios.put(`/carreras/${id}`, datosActualizados);
      toast.success("Actualización exitosa", {
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
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error("Error al actualizar la carrera", {
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
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Actualizar Carrera</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <strong>
                <label>
                  <strong>Actualizar Imágenes:</strong>
                </label>
              </strong>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="img"
                  onChange={handleFileChange}
                  multiple
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
              <div className="formInput">
                <label>
                  <strong>Nombre</strong>
                </label>
                <input
                  type="text"
                  placeholder="Nombre de la Carrera"
                  id="nombre"
                  value={info.nombre !== undefined ? info.nombre : carrera.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>
                  <strong>Descripción</strong>
                </label>
                <input
                  type="text"
                  placeholder="Descripción"
                  id="descripcion"
                  value={info.descripcion !== undefined ? info.descripcion : carrera.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>
                  <strong>Duración</strong>
                </label>
                <input
                  type="number"
                  placeholder="Duración de la Carrera en años"
                  id="duracion"
                  value={info.duracion !== undefined ? info.duracion : carrera.duracion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>
                  <strong>Perfil Egreso</strong>
                </label>
                <input
                  type="text"
                  placeholder="Perfil de Egreso de la carrera"
                  id="perfilEgreso"
                  value={info.perfilEgreso !== undefined ? info.perfilEgreso : carrera.perfilEgreso}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>
                  <strong>Perfil Ingreso</strong>
                </label>
                <input
                  type="text"
                  placeholder="Perfil de Ingreso para la carrera"
                  id="perfilIngreso"
                  value={info.perfilIngreso !== undefined ? info.perfilIngreso : carrera.perfilIngreso}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Plan de Estudio</strong>
                </label>
                <input
                  type="text"
                  placeholder="Descripción del plan de estudio"
                  id="planEstudio"
                  value={info.planEstudio !== undefined ? info.planEstudio : carrera.planEstudio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Campo Ocupacional</strong>
                </label>
                <input
                  type="text"
                  placeholder="Campo Ocupacional de la carrera"
                  id="campoOcupacional"
                  value={info.campoOcupacional !== undefined ? info.campoOcupacional : carrera.campoOcupacional}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Requisitos Ingreso</strong>
                </label>
                <input
                  type="text"
                  placeholder="Resquisitos de Ingreso para la carrera"
                  id="requisitosIngreso"
                  value={info.requisitosIngreso !== undefined ? info.requisitosIngreso : carrera.requisitosIngreso}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>
                  <strong>Titulo que otorga</strong>
                </label>
                <input
                  type="text"
                  placeholder="Titulo que otorga la carrera"
                  id="tituloOtorga"
                  value={info.tituloOtorga !== undefined ? info.tituloOtorga : carrera.tituloOtorga}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Contacto</strong>
                </label>
                <input
                  type="text"
                  placeholder="Persona encargada de informar sobre la carrera"
                  id="contacto"
                  value={info.contacto !== undefined ? info.contacto : carrera.contacto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Correo</strong>
                </label>
                <input
                  type="email"
                  placeholder="Persona encargada de informar sobre la carrera"
                  id="correo"
                  value={info.correo !== undefined ? info.correo : carrera.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Telefono</strong>
                </label>
                <input
                  type="number"
                  placeholder="Telefono de contacto"
                  id="telefono"
                  value={info.telefono !== undefined ? info.telefono : carrera.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Director de Carrera</strong>
                </label>
                <input
                  type="text"
                  placeholder="Director de Carrera"
                  id="dirCarrera"
                  value={info.dirCarrera !== undefined ? info.dirCarrera : carrera.dirCarrera}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Ubicación de la Facultad de la carrera</strong>
                </label>
                <input
                  type="text"
                  placeholder="Ubicación de la Facultad de la carrera"
                  id="ubicacionDirCarrera"
                  value={info.ubicacionDirCarrera !== undefined ? info.ubicacionDirCarrera : carrera.ubicacionDirCarrera}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Categoría</strong>
                </label>
                <select
                  id="categoria"
                  onChange={handleChange}
                  value={info.categoria !== undefined ? info.categoria : carrera.categoria}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Pregrado">Pregrado</option>
                  <option value="Postgrado">Postgrado</option>
                </select>
              </div>

              <div className="formInput">
                <label>
                  <strong>Sede</strong>
                </label>
                <select
                  id="sede"
                  onChange={handleChange}
                  value={info.sede !== undefined ? info.sede : carrera.sede}
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
              <div className="formInput2">
                <label>
                  <strong>Modalidad Graduación</strong>
                </label>
                <div className="checkboxOptions">
                  {graduaciones.map((graduacion) => (
                    <div key={graduacion._id} className="checkboxOption">
                      <label htmlFor={`modalidadGraduacion-${graduacion._id}`}>
                        {graduacion.nombre}
                      </label>
                      <input
                        type="checkbox"
                        id={`modalidadGraduacion-${graduacion._id}`}
                        value={graduacion.nombre}
                        checked={selectedGraduacion.includes(graduacion.nombre)}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="formInput">
                <label>
                  <strong>Destacada</strong>
                </label>
                <select
                  id="destacada"
                  onChange={handleChange}
                  value={info.destacada || carrera.destacada}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="formInput">
                <label>
                  <strong>Activo</strong>
                </label>
                <select
                  id="activo"
                  onChange={handleChange}
                  value={info.activo || carrera.activo}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <button className="buttond" type="submit">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ActualizarCarrera;
