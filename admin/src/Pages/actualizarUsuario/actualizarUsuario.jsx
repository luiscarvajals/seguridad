import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./actualizarUsuario.css";
import { useParams } from "react-router-dom";

const ActualizarUsuario = ({ inputs, title }) => {
  const [files] = useState([]);
  const [info, setInfo] = useState({});
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [setCurrentUserRole] = useState("");

  useEffect(() => {
    axios
      .get("/roles/obtener") // Asegúrate de usar la ruta correcta que coincida con tu backend
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []);

  useEffect(() => {
    // Realizar una solicitud GET para obtener el rol actual del usuario específico desde el backend
    axios
      .get(`/api/roles/${id}`)
      .then((response) => {
        const userRole = response.data.roles;
        setCurrentUserRole(userRole); // Establecer el rol actual del usuario
      })
      .catch((error) => {
        // Manejar errores si es necesario
        console.error("Error al obtener el rol del usuario:", error);
      });
  }, [setCurrentUserRole, id]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`/usuarios/${id}`);

        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, [id]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleFileChange = (e) => {
  //   const selectedFiles = e.target.files;
  //   setFiles([...selectedFiles]);

  //   if (selectedFiles.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewImage(reader.result);
  //     };
  //     reader.readAsDataURL(selectedFiles[0]);
  //   } else {
  //     setPreviewImage("");
  //   }
  // };

  //   const handleDeleteImage = () => {
  //   if (userData && userData.img) {
  //     setUserData((prevUserData) => ({
  //       ...prevUserData,
  //       img: "" // Borrar la URL de la imagen estableciéndola como una cadena vacía
  //     }));
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...info };

      if (files.length > 0) {
        const uploadPromises = files.map((file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          return axios.post(
            "https://api.cloudinary.com/v1_1/dwwj8mhse/image/upload",
            data
          );
        });

        const uploadResponses = await Promise.all(uploadPromises);
        const imageUrls = uploadResponses.map((res) => res.data.secure_url);
        updatedUser.img = imageUrls;
      } else if (!userData.img) {
        updatedUser.img =
          "https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"; // Borrar la URL de la imagen si no se han agregado nuevas imágenes
      }

      await axios.put(`/usuarios/${id}`, updatedUser);

      window.location.replace("/usuarios");
    } catch (err) {
      console.log(err);
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
          {/* <div className="left">
  {previewImage ? (
    <div>
      <img src={previewImage} alt="Vista previa de la imagen" />
      <button onClick={handleDeleteImage}>Eliminar</button>
    </div>
  ) : userData.img ? (
    <div>
      {userData.img.map((url, index) => (
        <img key={index} src={url} alt={`Imagen ${index + 1}`} />
      ))}
      <button onClick={handleDeleteImage}>Eliminar</button>
    </div>
  ) : (
    <img
      src="https://cdn.tresorit.com/webv10/dist/img/landings/features/icons/icon-file-sharing.3802e9ca.png"
      alt="avatar"
    />
  )}
</div> */}

          <div className="right">
            <form>
              <div className="formInput">
                {/* <label htmlFor="files">
              Imágenes: <DriveFolderUploadOutlinedIcon className="icon" />
            </label> */}
                {/* <input
              type="file"
              id="files"
              onChange={handleFileChange}
              style={{ display: "none" }}
              multiple
            /> */}
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>
                    <strong>{input.label}</strong>
                  </label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    defaultValue={userData[input.id]}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>
                  <strong>Roles</strong>
                </label>
                <select
                  id="roles"
                  onChange={handleChange}
                  value={userData.roles}
                >
                  <option value="">Seleccione una opción</option>
                  {availableRoles.map((role, index) => (
                    <option key={index} value={role.nombre}>
                      {role.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label>
                  <strong>Activo</strong>
                </label>
                <select
                  id="activo"
                  onChange={handleChange}
                  value={info.activo || userData.activo}
                >
                  <option value="">Seleccione una opción</option>
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <button onClick={handleClick}>Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarUsuario;
