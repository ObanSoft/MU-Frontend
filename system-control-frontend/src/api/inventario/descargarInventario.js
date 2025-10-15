import API from '../consumoApi'

export const descargarInventarioExcel = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/reportes/exportarExcelInventario`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error al descargar inventario');

  const blob = await res.blob();
  return blob;
};
