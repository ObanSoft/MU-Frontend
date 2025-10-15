import API from '../consumoApi'

export const obtenerVentas = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/verVentas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener ventas');
  return data.ventas;
};