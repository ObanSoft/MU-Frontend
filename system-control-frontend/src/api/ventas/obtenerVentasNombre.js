import API from '../consumoApi'

export const obtenerVentasPorNombre = async (nombre) => {
  const token = localStorage.getItem('token');
  const nombreLimpio = nombre.trim();
  const res = await fetch(`${API}/ventas/ventasPorNombre/${encodeURIComponent(nombreLimpio)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `No se encontraron ventas para ${nombreLimpio}`);

  if (data.ventas) {
    return data.ventas.map(v => ({
      ...v,
      nombre_producto: data.nombre_producto 
    }));
  }

  return Array.isArray(data) ? data : [data];
};