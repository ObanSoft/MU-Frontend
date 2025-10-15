import API from '../consumoApi'

export const descargarExcelCombos = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/reportes/exportarExcelCombos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Error al descargar el archivo Excel');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_combos_${new Date().toISOString().slice(0,10)}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar el Excel:', error.message);
    alert('Hubo un problema al descargar el archivo.');
  }
};