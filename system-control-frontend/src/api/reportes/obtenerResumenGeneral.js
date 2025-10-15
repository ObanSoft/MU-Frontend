import API from "../consumoApi";

export const obtenerResumenGeneral = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/resumenGeneral`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener resumen general');
  return data;
};