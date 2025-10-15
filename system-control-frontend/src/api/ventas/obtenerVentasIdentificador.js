import API from '../consumoApi'

export const obtenerVentaPorId = async (id) => {
  const token = localStorage.getItem('token');

  const res = await fetch(
    `${API}/ventas/ventaPorIdentificador/${encodeURIComponent(id)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || `No se encontró la venta con ID ${id}`
    );
  }

  return Array.isArray(data) ? data : [data];
};