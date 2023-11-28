import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio.jsx';
import About from './Pages/About/About.jsx';
import Historia from './Pages/Historia/Historia.jsx';
import CarreraIni from './Pages/Carrera/CarreraIni.jsx'
import Carrera from './Pages/Carrera/Carrera.jsx';
import SedesIni from './Pages/SedesIni/SedesIni.jsx';
import NoticiaEspecifica from './Pages/NoticiaEspecifica/NoticiaEspecifica.jsx';
import Usei from './Pages/Servicios/Usei.jsx';
import RedSalud from './Pages/Servicios/RedSalud.jsx';
import FinUcb from './Pages/Servicios/FinUcb.jsx';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/about" element ={<About />} />
          <Route path="/historia" element ={<Historia />} />
          <Route path="/carreras" element ={<CarreraIni/>} />
          <Route path="/carreras/:id" element ={<Carrera/>} />
          <Route path="/sedes/:id" element ={<SedesIni/>} />
          <Route path="/noticias/:id" element ={<NoticiaEspecifica/>} />
          <Route path="/usei" element ={<Usei/>} />
          <Route path="/redsalud" element={<RedSalud/>} />
          <Route path="/finucb" element={<FinUcb/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
