import { useState, useEffect } from 'react';
import { obtenerResumenInventario } from '../../api/inventario/obtenerResumenInventario'
import { descargarInventarioExcel } from '../../api/inventario/descargarInventario';

export const useInventarioResumen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerResumenInventario();
        setDatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleDescargarExcel = async () => {
    try {
      const blob = await descargarInventarioExcel();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventario.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error al descargar inventario');
    }
  };

  return { loading, error, datos, handleDescargarExcel };
};
