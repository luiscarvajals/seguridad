import "./usuario.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { generateRandomPassword } from "../../Utils/generatePassword";
import { generateUsername } from "../../Utils/generateUsername";

const Usuario = ({ title }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [usuario, setUsuario] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [roles, setRoles] = useState("");
  const [activo, setActivo] = useState(true);

  const [availableRoles, setAvailableRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/roles/obtener") // carga roles disponibles en db
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []);

  // genera usuario a partir de nombre y apellido
  const handleGenerateUsername = () => {
    if (!nombre || !apellido) {
      toast.error("Completa el nombre y el apellido antes de generar el usuario");
      return;
    }
    const newUsername = generateUsername(nombre, apellido);
    setUsuario(newUsername);
    toast.success("Usuario generado correctamente");
  };

  // genera contraseña aleatoria
  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(10);
    setPassword(newPassword);
    toast.success("Contraseña generada correctamente");
  };

  // copiar al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copiado al portapapeles");
    }, (err) => {
      toast.error("Error al copiar");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validacion de campos
    if (!usuario || !password) {
      toast.error("Faltan el usuario o la contraseña");
      return;
    }
    
    // payload para enviar al backend
    const nuevoUsuario = {
      usuario,
      nombre,
      apellido,
      fechaNacimiento,
      email,
      password,
      pais,
      ciudad,
      telefono,
      roles: [roles],
      activo
    };

    try {
      await axios.post("/autenticacion/registro", nuevoUsuario);
      toast.success("¡Usuario registrado con éxito!");
      setTimeout(() => {
        navigate("/usuarios");
      }, 1200);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
        toast.error("Error al crear usuario");
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title || "Registrar Nuevo Usuario"}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label><strong>Nombres</strong></label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Apellidos</strong></label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>

              {/* USERNAME */}
              <div className="formInput">
                <label><strong>Usuario</strong></label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                  />
                  <button type="button" onClick={handleGenerateUsername}>
                    Generar
                  </button>
                  <button type="button" onClick={() => copyToClipboard(usuario)}>
                    Copiar
                  </button>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="formInput">
                <label><strong>Password</strong></label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={handleGeneratePassword}>
                    Generar
                  </button>
                  <button type="button" onClick={() => copyToClipboard(password)}>
                    Copiar
                  </button>
                </div>
              </div>

              <div className="formInput">
                <label><strong>Fecha de Nacimiento</strong></label>
                <input
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Email</strong></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Teléfono</strong></label>
                <input
                  type="phone"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label><strong>País</strong></label>
                <input
                  type="text"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Ciudad</strong></label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  required
                />
              </div>

              <div className="formInput">
                <label><strong>Rol</strong></label>
                <select value={roles} onChange={(e) => setRoles(e.target.value)} required>
                  <option value="">Seleccione un rol</option>
                  {availableRoles.map((role, index) => (
                    <option key={role._id || index} value={role.nombre}>
                      {role.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label><strong>Activo</strong></label>
                <select
                  value={activo}
                  onChange={(e) => setActivo(e.target.value === "true")}
                  required
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
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

export default Usuario;
