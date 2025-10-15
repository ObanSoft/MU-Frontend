import { useState, useEffect } from 'react';
import { obtenerProductosDisponibles } from '../../api/ventas/obtenerProductosDisponibles'
import { crearVenta } from '../../api/ventas/crearVenta';

export const useRegistrarVenta = (modalOpen, onVentaRegistrada) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [vendidoPor, setVendidoPor] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      cargarProductos();
      limpiarFormulario();
    }
  }, [modalOpen]);

  const cargarProductos = async () => {
    try {
      const nombres = await obtenerProductosDisponibles();
      setProductos(nombres);
    } catch (err) {
      console.error('Error cargando productos', err);
    }
  };

  const limpiarFormulario = () => {
    setProductoSeleccionado('');
    setCantidad(1);
    setVendidoPor('');
    setMetodoPago('');
    setMensaje('');
  };

  const registrarVenta = async () => {
    setCargando(true);
    setMensaje('');
    try {
      const data = await crearVenta({ nombre_producto: productoSeleccionado, cantidad, vendido_por: vendidoPor, metodo_pago: metodoPago });
      setMensaje(data.mensaje);
      if (onVentaRegistrada) onVentaRegistrada();
      limpiarFormulario();
    } catch (err) {
      setMensaje(err.message || 'Error al registrar venta');
    } finally {
      setCargando(false);
    }
  };

  return {
    productos,
    productoSeleccionado,
    setProductoSeleccionado,
    cantidad,
    setCantidad,
    vendidoPor,
    setVendidoPor,
    metodoPago,
    setMetodoPago,
    mensaje,
    cargando,
    registrarVenta,
    limpiarFormulario,
  };
};
