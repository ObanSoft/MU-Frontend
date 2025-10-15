import API from '../consumoApi'

export const obtenerTop5MasVendidos = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/top5Vendidos`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener productos más vendidos');
  return data; 
};