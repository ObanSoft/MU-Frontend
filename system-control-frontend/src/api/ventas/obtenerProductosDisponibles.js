import API from '../consumoApi'

export const obtenerProductosDisponibles = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/productos/verProductos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener productos');

  const disponibles = data.productos.filter(p => p.estado === 'inventario');
  const nombresUnicos = [...new Set(disponibles.map(p => p.nombre))];
  return nombresUnicos;
};