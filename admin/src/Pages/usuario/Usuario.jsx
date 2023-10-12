import "./usuario.scss";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const New = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e) => {
    console.log("Archivo seleccionado:", e.target.files);
    setFiles([...e.target.files]);
  };

  
  const handlePhoneKeyPress = (e) => {
    const key = e.key;
    const isNumber = /^\d$/.test(key);
    const isModifierKey = /^(Backspace|Delete|ArrowLeft|ArrowRight|Tab)$/.test(key);

    if (!isNumber && !isModifierKey) {
      e.preventDefault();
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Validar el formato del correo electrónico
    const emailInput = form.querySelector('#email');
    const email = emailInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.setCustomValidity('Ingrese un correo electrónico válido');
      emailInput.reportValidity();
      return;
    }
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    data.append("upload_preset", "upload");
    try {
      let img = "https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"; // Valor por defecto para el campo de imagen
      if (files.length > 0) {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dwwj8mhse/image/upload",
        data
      );
      const {secure_url} = uploadRes.data; //subir imagenes a cloudinary
      img = secure_url;
    }
      const nuevoUsuario = {
        ...info,
        img: img,
      };
      console.log("Datos del nuevo usuario:", nuevoUsuario);
      await axios.post("/autenticacion/registro", nuevoUsuario);
      toast.success("¡Registro exitoso!", {
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
        navigate("/usuarios");
      }, 1200);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const errorMessage = err.response.data.message;
        if (errorMessage === "El usuario ya existe") {
          toast.error("El usuario ya está en uso", {
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
        } else if (errorMessage === "El email ya existe") {
          toast.error("Este email ya fue registrado", {
            duration: 5000,
            position: "top-center",
            style: {
              background: "#3081FF",
              color: "white",
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
        {/* <Navbar /> */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {files ? (
              files.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt="" />
              ))
            ) : (
              <img
                src="https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"
                alt=""
              />
            )}
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="files">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="files"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  unique
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    onKeyPress={input.id === 'telefono' ? handlePhoneKeyPress : null}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    required
                  />
                  {/* {errors[input.id] && (
              <span className="error">{errors[input.id]}</span>
            )} */}
                </div>
              ))}
              <div className="formInput">
                <label>Administrador</label>
                <select id="isAdmin" onChange={handleChange} required>
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

export default New;