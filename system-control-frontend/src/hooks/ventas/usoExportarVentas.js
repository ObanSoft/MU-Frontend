import { descargarExcelVentas } from '../../api/ventas/descargarVentas';

export const useExportarVentas = () => {
  const exportarExcel = async () => {
    try {
      const blob = await descargarExcelVentas();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ventas_${new Date().toISOString().slice(0,10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar Excel:', error.message);
      alert('Error al descargar el archivo de ventas.');
    }
  };

  return { exportarExcel };
};
