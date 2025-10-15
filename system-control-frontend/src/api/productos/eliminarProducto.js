import API from '../consumoApi'

export const eliminarProductoPorIdentificador = async (identificador) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/eliminarProducto/${encodeURIComponent(identificador)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.mensaje || 'No se pudo eliminar el producto');
  return data;
};