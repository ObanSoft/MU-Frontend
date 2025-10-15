import API from '../consumoApi'

export const descargarExcelVentas = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/exportarExcelVentas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al descargar Excel');

  const blob = await res.blob();
  return blob;
};
