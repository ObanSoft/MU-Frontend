import { useState } from 'react';
import { registrarProducto } from '../../api/productos/registrarProducto';

export const useAgregarProducto = (onProductoAgregado) => {
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ open: false, mensaje: '', tipo: 'success' });

  const registrar = async ({ nombre, precioVenta, precioCompra, cantidad }) => {
    setLoading(true);
    try {
      await registrarProducto(nombre, precioVenta, precioCompra, cantidad);
      if (onProductoAgregado) onProductoAgregado();
      setAlerta({ open: true, mensaje: 'Producto(s) registrado(s) correctamente.', tipo: 'success' });
      return true;
    } catch (err) {
      const msg = err.message.includes('existe') || err.message.includes('nombre')
        ? 'Ya existe un producto con ese nombre.'
        : err.message;
      setAlerta({ open: true, mensaje: msg, tipo: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cerrarAlerta = () => setAlerta({ ...alerta, open: false });

  return { loading, alerta, setAlerta, registrar, cerrarAlerta };
};
