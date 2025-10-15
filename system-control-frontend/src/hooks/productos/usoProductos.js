import { useState, useEffect } from 'react';
import { buscarProductosPorNombre } from '../../api/productos/buscarProductos'
import  { obtenerTodosLosProductos } from '../../api/productos/obtenerProductos'
import { consultarProductoPorIdentificador } from '../../api/productos/buscarProductoIdentificador'
import { eliminarProductoPorIdentificador} from '../../api/productos/eliminarProducto'

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '', tipo: 'success' });

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const datos = await obtenerTodosLosProductos();
      setProductos(datos);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const buscarProducto = async (nombre) => {
    setLoading(true);
    setMensaje('');
    try {
      if (!nombre.trim()) {
        const todos = await obtenerTodosLosProductos();
        setProductos(todos);
      } else if (/^[A-Z0-9]{8,}$/.test(nombre.trim())) {
        try {
          const producto = await consultarProductoPorIdentificador(nombre.trim());
          setProductos([producto]);
        } catch (error) {
          setProductos([]);
          setMensaje(error.message);
        }
      } else {
        const resultados = await buscarProductosPorNombre(nombre);
        setProductos(resultados);
      }
    } catch (error) {
      setProductos([]);
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (identificador) => {
    try {
      await eliminarProductoPorIdentificador(identificador);
      setProductos((prev) => prev.filter((p) => p.identificador_unico !== identificador));
      setSnackbar({ open: true, mensaje: 'Producto eliminado correctamente', tipo: 'success' });
    } catch (err) {
      setSnackbar({ open: true, mensaje: err.message, tipo: 'error' });
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    loading,
    mensaje,
    selectedProduct,
    setSelectedProduct,
    snackbar,
    setSnackbar,
    buscarProducto,
    eliminarProducto,
  };
};
