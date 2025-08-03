const API = 'http://localhost:5000';

export const obtenerVentasPorMes = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/ventas_por_mes`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener ventas por mes');
  return data; 
};

export const obtenerMargenPorProducto = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/margen_por_producto`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener margen por producto');
  return data.margen_por_producto;
};

export const obtenerTop5MasVendidos = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/top5_mas_vendidos`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener productos más vendidos');
  return data; 
};

export const obtenerResumenGeneral = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/resumen_general`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener resumen general');
  return data;
};

export const obtenerDetalleProducto = async (nombre) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/producto_detalle?nombre=${encodeURIComponent(nombre)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener detalle del producto');
  return data;
};
