import { useState } from 'react';
import { obtenerVentasPorNombre } from '../../api/ventas/obtenerVentasNombre'
import { obtenerVentaPorId } from '../../api/ventas/obtenerVentasIdentificador';

export const useBusquedaVentas = () => {
  const [busqueda, setBusqueda] = useState('');
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);
  const [mensajeBusqueda, setMensajeBusqueda] = useState('');

  const buscarVentas = async (busquedaValor, setVentas, cargarTodasLasVentas) => {
    const valorLimpio = busquedaValor.trim();

    if (!valorLimpio) {
      setMensajeBusqueda('');
      await cargarTodasLasVentas();
      return;
    }

    setMensajeBusqueda('');
    setLoadingBusqueda(true);

    try {
      let data;
      if (/^[A-Z0-9]{10}$/i.test(valorLimpio)) {
        data = await obtenerVentaPorId(valorLimpio);
      } else {
        data = await obtenerVentasPorNombre(valorLimpio);
      }

      setVentas(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setMensajeBusqueda(err.message);
      setVentas([]);
    } finally {
      setLoadingBusqueda(false);
    }
  };

  return { busqueda, setBusqueda, buscarVentas, loadingBusqueda, mensajeBusqueda };
};
