import { useState } from "react";

export const useFiltrosReportes = (ventasMes, detalleProducto) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState("");
  const [ventasFiltradas, setVentasFiltradas] = useState(ventasMes);
  const [detalleFiltrado, setDetalleFiltrado] = useState(null);

  const manejarCambioMes = (mes) => {
    setMesSeleccionado(mes);
    const filtradas = mes ? ventasMes.filter(v => v.mes === mes) : ventasMes;
    setVentasFiltradas(filtradas);

    if (detalleProducto?.ventas_por_mes) {
      const detalleMes = detalleProducto.ventas_por_mes.find(v => v.mes === mes);
      setDetalleFiltrado(detalleMes || null);
    } else {
      setDetalleFiltrado(null);
    }
  };

  const obtenerMesesUnicos = () => [...new Set(ventasMes.map(v => v.mes))];

  return {
    productoSeleccionado,
    setProductoSeleccionado,
    mesSeleccionado,
    manejarCambioMes,
    obtenerMesesUnicos,
    ventasFiltradas,
    detalleFiltrado,
  };
};
