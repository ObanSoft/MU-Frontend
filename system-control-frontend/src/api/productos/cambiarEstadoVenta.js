import API from '../consumoApi'

export const cambiarEstadoProducto = async (identificador) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/cambiarEstado/${encodeURIComponent(identificador)}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.mensaje || 'Error al cambiar estado del producto');
  return data;
};