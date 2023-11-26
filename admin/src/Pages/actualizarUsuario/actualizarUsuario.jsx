import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./actualizarUsuario.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";


const ActualizarUsuario = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [setCurrentUserRole] = useState("");

  console.log("User data:", userData)

  const navigate = useNavigate();

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

  // useEffect(() => {
  //   // Realizar una solicitud GET para obtener el rol actual del usuario específico desde el backend
  //   axios
  //     .get(`/api/roles/${id}`)
  //     .then((response) => {
  //       const userRole = response.data.roles;
  //       setCurrentUserRole(userRole); // Establecer el rol actual del usuario
  //     })
  //     .catch((error) => {
  //       // Manejar errores si es necesario
  //       console.error("Error al obtener el rol del usuario:", error);
  //     });
  // }, [setCurrentUserRole, id]);

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
    const { id, type, checked, value } = e.target;
  
    let newValue;
  
    if (type === "phone") {
      // Validar que el valor sea al menos 1 para inputs de tipo "number"
      newValue = value < 1 ? 1 : parseInt(value);
    } else {
      newValue = value;
    }
  
    if (type === "checkbox" && id.startsWith("modalidadGraduacion")) {
     
    } else {
      setInfo((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : newValue,
      }));
    }
  };

  const convertirFecha = (fecha) => {
    if (!fecha) {
      return '';
    }
  
    const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
    return fechaFormateada;
  };
  
  

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...info };

      await axios.put(`/usuarios/${id}`, updatedUser);
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
         navigate("/usuarios");
      }, 500);
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Actualizar Usuario</h1>
        </div>
        <div className="bottom">
          <div className="right">
          <form onSubmit={handleClick}>
              <div className="formInput">
                <label><strong>Usuario</strong></label>
                <input
                  type="text"
                  placeholder="Usuario"
                  id="usuario"
                  value={info.usuario !== undefined ? info.usuario : userData.usuario}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Nombre</strong></label>
                <input
                  type="text"
                  placeholder="Nombre"
                  id="nombre"
                  value={info.nombre !== undefined ? info.nombre : userData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Apellido</strong></label>
                <input
                  type="text"
                  placeholder="Apellido"
                  id="apellido"
                  value={info.apellido !== undefined ? info.apellido : userData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
      <label><strong>Fecha Nacimiento</strong></label>
      <input
        type="date"
        placeholder="Fecha Nacimiento"
        id="fechaNacimiento"
        value={info.fechaNacimiento !== undefined ? info.fechaNacimiento : convertirFecha(userData.fechaNacimiento)}
        onChange={handleChange}
        required
        readOnly={userData.fechaNacimiento !== undefined}
        className="input-date"
      />
    </div>


              <div className="formInput">
                <label><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={info.email !== undefined ? info.email : userData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Telefono</strong></label>
                <input
                  type="phone"
                  placeholder="Telefono"
                  id="telefono"
                  value={info.telefono !== undefined ? info.telefono : userData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Password</strong></label>
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  value={info.password !== undefined ? info.password : userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label><strong>Pais</strong></label>
                <input
                  type="text"
                  placeholder="Pais"
                  id="pais"
                  value={info.pais !== undefined ? info.pais : userData.pais}
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
                  value={info.ciudad !== undefined ? info.ciudad : userData.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label>
                  <strong>Roles</strong>
                </label>
                <select
                  id="roles"
                  onChange={handleChange}
                  value={info.roles || userData.roles}
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
      <Toaster />
    </div>
  );
};

export default ActualizarUsuario;
