import API from '../consumoApi'

export const obtenerMargenVentas = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/margenVentas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al calcular margen');
  return data.total_ventas_cop;
};