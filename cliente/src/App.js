import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio';
import About from './Pages/About/About';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/about" element ={<About />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
