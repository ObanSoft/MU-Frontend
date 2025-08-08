import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Productos from './pages/Products';
import Invenatarios from './pages/Inventarios';
import CambioEstado from './pages/CambioEstado'; 
import Ventas from './pages/Ventas';
import Reportes from './pages/Reportes';
import RequireAuth from './api/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/productos" element={<RequireAuth><Productos /></RequireAuth>} />
        <Route path="/inventarios" element={<RequireAuth><Invenatarios /></RequireAuth>} />
        <Route path="/cambio-estado" element={<RequireAuth><CambioEstado /></RequireAuth>} />
        <Route path="/ventas" element={<RequireAuth><Ventas /></RequireAuth>} />
        <Route path="/reportes" element={<RequireAuth><Reportes /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
