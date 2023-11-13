import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio';
import About from './Pages/About/About';
import Historia from './Pages/Historia/Historia';
import CarreraIni from './Pages/Carrera/CarreraIni'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/about" element ={<About />} />
          <Route path="/historia" element ={<Historia />} />
          <Route path="/carrera" element ={<CarreraIni/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
