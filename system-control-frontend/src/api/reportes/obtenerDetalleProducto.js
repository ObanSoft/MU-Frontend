import API from '../consumoApi'

export const obtenerDetalleProducto = async (nombre) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/productoDetalle?nombre=${encodeURIComponent(nombre)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener detalle del producto');
  return data;
};


