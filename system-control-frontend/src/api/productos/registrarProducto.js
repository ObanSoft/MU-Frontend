import API from '../consumoApi'

export const registrarProducto = async (nombre, precio_venta, precio_compra, cantidad = 1) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/registrarProducto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre, precio_venta, precio_compra, cantidad }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Error al registrar producto');
  return data;
};