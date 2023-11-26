import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ActualizarSede = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sedes, setSedes] = useState({});
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [deletedImages] = useState([]);

  useEffect(() => {
    axios
      .get(`/sedes/${id}`)
      .then((response) => {
        setSedes(response.data);
        if (Array.isArray(response.data.img)) {
          setPreviewImages(response.data.img);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la sede:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev)=> ({ ...prev, [e.target.id]: e.target.value }));
    console.log('Value:', e.target.value);
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
    if (sedes && sedes.img && sedes.img.length > 0) {
      const updatedImages = sedes.img.filter((imagen, i) => i !== index);
      
      setSedes({ ...sedes, img: updatedImages });
      setPreviewImages((prevImages) =>
      prevImages.filter((_, i) => i !== index));
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
        sedes.imagenes = sedes.imagenes.filter(
          (image) => !deletedImages.includes(image)
        );
      }
      const datosActualizados = {
        ...info,
        img: sedes.img ? [...sedes.img, ...list] : list,

      };
      await axios.put(`/sedes/${id}`, datosActualizados);
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
        "Cargando..."
        navigate("/sedes");
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error("Error al actualizar la noticia", {
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
          <h1>Actualizar Sedes</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <strong>
                <label><strong>Actualizar Imágenes:</strong></label>
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
                <label><strong>Nombre</strong></label>
                <input
                  type="text"
                  placeholder="Nombre"
                  id="nombre"
                  value={info.nombre !== undefined ? info.nombre : sedes.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Ciudad</strong></label>
                <input
                  type="text"
                  placeholder="Ciudad"
                  id="ciudad"
                  value={info.ciudad !== undefined ? info.ciudad : sedes.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Telefono</strong></label>
                <input
                  type="number"
                  placeholder="Telefono"
                  id="telefono"
                  value={info.telefono !== undefined ? info.telefono : sedes.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Calle</strong></label>
                <input
                  type="text"
                  placeholder="Calle"
                  id="calle"
                  value={info.calle !== undefined ? info.calle : sedes.calle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Número de dirección</strong></label>
                <input
                  type="number"
                  placeholder="Numero"
                  id="numero"
                  value={info.numero !== undefined ? info.numero : sedes.numero}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Zona</strong></label>
                <input
                  type="text"
                  placeholder="Zona"
                  id="zona"
                  value={info.zona !== undefined ? info.zona : sedes.zona}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>País</strong></label>
                <input
                  type="text"
                  placeholder="País"
                  id="pais"
                  value={info.pais !== undefined ? info.pais : sedes.pais}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Email</strong></label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  value={info.email !== undefined ? info.email : sedes.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Destacada</strong></label>
                <select
                  id="destacada"
                  onChange={handleChange}
                  value={info.destacada || sedes.destacada}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="formInput">
                <label><strong>Activo</strong></label>
                <select
                  id="activo"
                  onChange={handleChange}
                  value={info.activo || sedes.activo}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <button type="submit">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ActualizarSede;
