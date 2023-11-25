import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Noticia = ({ inputs, title }) => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [previewImages, setPreviewImages] = useState([]); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e) => {
    console.log("Archivos seleccionados:", e.target.files);
    const selectedFiles = Array.from(e.target.files); // Convertir en un arreglo

    setFiles(selectedFiles);

    // Vista previa de las imágenes
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
    
      const nuevaNoticia = {
        ...info,
        img: list,
      };
    try {
      console.log("Datos de la nueva noticia:", nuevaNoticia);
      await axios.post("/noticias/crear", nuevaNoticia);
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
        navigate("/noticias");
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
              <strong><label><strong>Subir Imágenes:</strong></label></strong>
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
                  <label><strong>{input.label}</strong></label>
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
                <label><strong>Destacada</strong></label>
                <select id="destacada" onChange={handleChange} required>
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="formInput">
                <label><strong>Activo</strong></label>
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
