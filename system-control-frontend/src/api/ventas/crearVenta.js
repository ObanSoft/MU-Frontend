import API from '../consumoApi'

export const crearVenta = async ({ nombre_producto, cantidad, vendido_por, metodo_pago }) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/crearVenta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre_producto, cantidad, vendido_por, metodo_pago }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al registrar venta');
  return data;
};