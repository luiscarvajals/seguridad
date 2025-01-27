import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import "./actualizarUsuario.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { generateRandomPassword } from "../../Utils/generatePassword";

const ActualizarUsuario = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const [availableRoles, setAvailableRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // carga de roles
    axios.get("/roles/obtener")
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []);

  useEffect(() => {
    // carga de datos actuales de usuario
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
    const { id, type, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const convertirFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toISOString().split('T')[0];
  };

  // generar nuevo password
  const handleGeneratePassword = () => {
    const newPass = generateRandomPassword(10);
    setInfo((prev) => ({ ...prev, password: newPass }));
    toast.success("Nueva contraseña generada", { duration: 2000 });
  };

  // copiar el nuevo password al portapapeles
  const handleCopyPassword = () => {
    if (info.password) {
      navigator.clipboard.writeText(info.password);
      toast.success("Contraseña copiada al portapapeles");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // preparando objeto para enviar
    const updatedUser = { ...info };

    // si el password es "********" o exactamente igual al anterior,
    // lo removemos, asi no sobreescribimos con informacion basura.
    // entonces: si no ha sido cambiado, sacarlo de la peticion o request.
    if (
      !info.password ||
      info.password === userData.password || // Comparando si es igual al antiguo password hasheado
      info.password === "********"
    ) {
      delete updatedUser.password;
    }

    try {
      await axios.put(`/usuarios/${id}`, updatedUser);
      toast.success("Actualización exitosa", {
        duration: 3000,
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/usuarios");
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Error al actualizar usuario");
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
                  value={info.usuario !== undefined ? info.usuario : userData.usuario || ""}
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
                  value={info.nombre !== undefined ? info.nombre : userData.nombre || ""}
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
                  value={info.apellido !== undefined ? info.apellido : userData.apellido || ""}
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
                  value={
                    info.fechaNacimiento !== undefined
                      ? info.fechaNacimiento
                      : convertirFecha(userData.fechaNacimiento)
                  }
                  onChange={handleChange}
                  required
                  className="input-date"
                />
              </div>

              <div className="formInput">
                <label><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={info.email !== undefined ? info.email : userData.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Telefono</strong></label>
                <input
                  type="text"
                  placeholder="Teléfono"
                  id="telefono"
                  value={info.telefono !== undefined ? info.telefono : userData.telefono || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* NUEVO CAMPO DE CONTRASEÑA */}
              <div className="formInput">
                <label><strong>Password</strong></label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="********"
                    id="password"
                    // Si tenemos una contraseña recién generada, se muestra; de lo contrario muestra "********"
                    value={
                      info.password !== undefined
                        ? info.password
                        : userData.password
                          ? "********"
                          : ""
                    }
                    onChange={handleChange}
                  />
                  <button type="button" onClick={handleGeneratePassword}>
                    Generar
                  </button>
                  <button type="button" onClick={handleCopyPassword}>
                    Copiar
                  </button>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#666" }}>
                  Deja el campo como "********" si no deseas cambiar la contraseña.
                </p>
              </div>

              <div className="formInput">
                <label><strong>Pais</strong></label>
                <input
                  type="text"
                  placeholder="Pais"
                  id="pais"
                  value={info.pais !== undefined ? info.pais : userData.pais || ""}
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
                  value={info.ciudad !== undefined ? info.ciudad : userData.ciudad || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Roles</strong></label>
                <select
                  id="roles"
                  onChange={handleChange}
                  value={info.roles || userData.roles || ""}
                >
                  <option value="">Seleccione una opción</option>
                  {availableRoles.map((role) => (
                    <option key={role._id} value={role.nombre}>
                      {role.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label><strong>Activo</strong></label>
                <select
                  id="activo"
                  onChange={handleChange}
                  value={
                    (info.activo !== undefined
                      ? info.activo
                      : userData.activo)?.toString() || ""
                  }
                >
                  <option value="">Seleccione una opción</option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
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
