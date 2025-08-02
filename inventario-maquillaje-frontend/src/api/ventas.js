const API = 'http://localhost:5000';

export const obtenerVentas = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/ver`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener ventas');
  return data.ventas;
};

export const obtenerVentasPorNombre = async (nombre) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/producto/${nombre}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `No se encontraron ventas para ${nombre}`);
  return data.ventas;
};

export const obtenerVentaPorId = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Venta no encontrada');
  return [data];
};

export const obtenerMargenVentas = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/margen_ventas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al calcular margen');
  return data.total_ventas_cop;
};

export const obtenerProductosDisponibles = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/productos/ver`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener productos');

  const disponibles = data.productos.filter(p => p.estado === 'inventario');
  const nombresUnicos = [...new Set(disponibles.map(p => p.nombre))];
  return nombresUnicos;
};

export const crearVenta = async (nombre_producto, cantidad) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/ventas/crearVenta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre_producto, cantidad }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al registrar venta');
  return data;
};
