import API from '../consumoApi'

export const obtenerVentasPorMes = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/ventasMes`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener ventas por mes');
  return data; 
};