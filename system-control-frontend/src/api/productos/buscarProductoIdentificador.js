import API from '../consumoApi'

export const consultarProductoPorIdentificador = async (identificador) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/consultarProducto/${encodeURIComponent(identificador)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'No se pudo consultar el producto');
  return data;
};