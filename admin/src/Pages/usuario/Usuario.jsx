import "./usuario.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";


const New = ({ title }) => {

  const [info, setInfo] = useState({});
  const [usuarioNew, setUsuarioNew] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");

  const [availableRoles, setAvailableRoles] = useState([]);

   const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/roles/obtener")
      .then((response) => {
        setAvailableRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    try {

       e.preventDefault();
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const numberRegex = /\d/;

    if (
      !passwordRegex.test(password) ||
      !numberRegex.test(password) ||
      password.length < 8
    ) {
      toast.error(
        "La contraseña debe contener al menos un caracter especial, un número y tener una longitud de al menos 8 caracteres",
        {
          duration: 5000,
          position: "top-center",
          style: {
            background: "red",
            color: "white", 
            fontWeight: "bold", 
            borderRadius: "10px",
            boxShadow: "0 20px 12px rgba(0, 0, 0, 0.4)", // Sombra
            width: "300px", 
            height: "180px",
          },
        }
      );
      return;
    }
      const nuevoUsuario = {
        
        usuario: usuarioNew,
        nombre,
        apellido,
        fechaNacimiento,
        email,
        password,
        pais,
        ciudad,
        telefono,
        roles: info.roles,
        activo: info.activo,
        
      };
      //console.log("Datos del nuevo usuario:", nuevoUsuario);
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
          
          <div className="right">
            <form onSubmit={handleClick}>
              

              <div className="formInput">
                <label>
                  <strong>Nombres</strong>
                </label>
                <input 
                type="text"
                id="nombre" 
                value={nombre}
                placeholder="Ingrese sus Nombres"
                onChange={(e) => setNombre(e.target.value)} 
                required>
                </input>
              </div>

              <div className="formInput">
                <label>
                  <strong>Apellidos</strong>
                </label>
                <input 
                type="text"
                id="apellido" 
                value={apellido}
                placeholder="Ingrese sus Apellidos"
                onChange={(e) => setApellido(e.target.value)} 
                required>
                </input>
              </div>

              <div className="formInput">
                <label>
                  <strong>Usuario</strong>
                </label>
                <input 
                type="text"
                id="usuario" 
                value={usuarioNew}
                placeholder="Ingrese su Usuario"
                onChange={(e) => setUsuarioNew(e.target.value)} 
                required>
                </input>
              </div>

              <div className="formInput">
                <label>
                  <strong>Password</strong>
                </label>
                <input 
                type="password"
                id="password" 
                value={password}
                placeholder="Ingrese su Password"
                onChange={(e) => setPassword(e.target.value)} 
                required>
                </input>
              </div>

              <div className="formInput">
                <label>
                  <strong>Fecha de Nacimiento</strong>
                </label>
                <input 
                type="date"
                id="fechaNacimiento" 
                value={fechaNacimiento}
                placeholder="Ingrese su Fecha de Nacimiento"
                onChange={(e) => setFechaNacimiento(e.target.value)} 
                required>
                </input>
              </div>
              
              <div className="formInput">
                <label>
                  <strong>Email</strong>
                </label>
                <input 
                type="email"
                id="email" 
                value={email}
                placeholder="Ingrese su Email"
                onChange={(e) => setEmail(e.target.value)} 
                required>
                </input>
              </div>

              <div className="formInput">
                <label>
                  <strong>Teléfono</strong>
                </label>
                <input 
                type="phone"
                id="telefono" 
                value={telefono}
                min={1}
                placeholder="Ingrese su teléfono"
                onChange={(e) => setTelefono(e.target.value)} 
                required>
                </input>
              </div>

              <div className="formInput">
                <label>
                  <strong>Pais</strong>
                </label>
                <input 
                type="text"
                id="pais" 
                value={pais}
                placeholder="Ingrese su País"
                onChange={(e) => setPais(e.target.value)} 
                required>
                </input>
              </div>
              
              <div className="formInput">
                <label>
                  <strong>Ciudad</strong>
                </label>
                <input 
                type="text"
                id="ciudad" 
                value={ciudad}
                placeholder="Ingrese su ciudad"
                onChange={(e) => setCiudad(e.target.value)} 
                required>
                </input>
              </div>


              <div className="formInput">
                <label>
                  <strong>Rol</strong>
                </label>
                <select id="roles" onChange={handleChange} required>
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
