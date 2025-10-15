import { useState, useEffect } from 'react';
import { obtenerVentas } from '../../api/ventas/obtenerVentas'
import {obtenerMargenVentas } from '../../api/ventas/obtenerMargenVentas';

export const useCargarVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [margen, setMargen] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarTodasLasVentas();
    cargarMargen();
  }, []);

  const cargarTodasLasVentas = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentas();
      const ventasIndividuales = data.filter(v => v.tipo_venta === 'Individual');
      setVentas(ventasIndividuales);
      setMensaje('');
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarMargen = async () => {
    try {
      const total = await obtenerMargenVentas();
      setMargen(total.toFixed(2));
    } catch (error) {
      console.error('Error al obtener el margen:', error.message);
    }
  };

  return { ventas, setVentas, margen, loading, mensaje, cargarTodasLasVentas, cargarMargen };
};
