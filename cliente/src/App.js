import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio.jsx';
import About from './Pages/About/About.jsx';
import Historia from './Pages/Historia/Historia.jsx';
import CarreraIni from './Pages/Carrera/CarreraIni.jsx'
import Carrera from './Pages/Carrera/Carrera.jsx';
import SedesIni from './Pages/SedesIni/SedesIni.jsx';

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
        </Routes>
    </BrowserRouter>
  );
}

export default App;
