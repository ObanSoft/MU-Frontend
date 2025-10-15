import API from '../consumoApi'

export const obtenerMargenPorProducto = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/margenPorProducto`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener margen por producto');
  return data.margen_por_producto;
};