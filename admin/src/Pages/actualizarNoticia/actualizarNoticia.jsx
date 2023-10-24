import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ActualizarNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState({});
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    axios
      .get(`/noticias/${id}`)
      .then((response) => {
        setNoticia(response.data);
        if (Array.isArray(response.data.img)) {
          setPreviewImages(response.data.img);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la noticia:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
    if (noticia && noticia.img && noticia.img.length > 0) {
      const updatedImages = noticia.img.filter((imagen, i) => i !== index);
      
      setNoticia({ ...noticia, img: updatedImages });
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
        noticia.imagenes = noticia.imagenes.filter(
          (image) => !deletedImages.includes(image)
        );
      }
      const datosActualizados = {
        ...info,
        img: noticia.img ? [...noticia.img, ...list] : list,
      };
      await axios.put(`/noticias/${id}`, datosActualizados);
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
        navigate("/noticias");
      }, 1200);
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
          <h1>Actualizar Noticia</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="formInput">
              <strong>
                <label>Actualizar Imágenes:</label>
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
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Título"
                  id="titulo"
                  value={info.titulo || noticia.titulo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Descripción</label>
                <input
                  type="text"
                  placeholder="Descripción"
                  id="descripcion"
                  value={info.descripcion || noticia.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Contenido</label>
                <input
                  type="text"
                  placeholder="Contenido"
                  id="contenido"
                  value={info.contenido || noticia.contenido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Destacada</label>
                <select
                  id="destacada"
                  onChange={handleChange}
                  value={info.destacada || noticia.destacada}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="formInput">
                <label>Activo</label>
                <select
                  id="activo"
                  onChange={handleChange}
                  value={info.activo || noticia.activo}
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

export default ActualizarNoticia;
