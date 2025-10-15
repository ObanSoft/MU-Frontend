import  API from '../consumoApi'

export const buscarProductosPorNombre = async (nombre) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/buscarProducto?nombre=${encodeURIComponent(nombre)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.mensaje || 'Error al buscar productos');
  return data.productos;
};