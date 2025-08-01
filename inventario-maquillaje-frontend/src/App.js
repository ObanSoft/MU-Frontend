import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Productos from './pages/Products';
import Invenatarios from './pages/Inventarios';
import CambioEstado from './pages/CambioEstado'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/inventarios" element={<Invenatarios />} />
        <Route path="/cambio-estado" element={<CambioEstado />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
