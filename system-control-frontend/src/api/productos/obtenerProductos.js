import API from '../consumoApi'

export const obtenerTodosLosProductos = async (page = 1, limit = 10) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/verProductos?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.mensaje || 'Error al cargar los productos');
  return data.productos;
};
