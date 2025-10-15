import { useEffect, useState } from "react";
import { obtenerVentasPorMes } from '../../api/reportes/obtenerVentasMes'
import { obtenerMargenPorProducto } from "../../api/reportes/obtenerMargenProducto";
import { obtenerTop5MasVendidos } from "../../api/reportes/obtenerTopMasVendidos";
import { obtenerResumenGeneral } from "../../api/reportes/obtenerResumenGeneral";
import { obtenerDetalleProducto } from "../../api/reportes/obtenerDetalleProducto";

export const useReportesData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ventasMes, setVentasMes] = useState([]);
  const [margenProductos, setMargenProductos] = useState([]);
  const [topVendidos, setTopVendidos] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [detalleProducto, setDetalleProducto] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [vm, mp, tv, rg] = await Promise.all([
          obtenerVentasPorMes(),
          obtenerMargenPorProducto(),
          obtenerTop5MasVendidos(),
          obtenerResumenGeneral(),
        ]);
        setVentasMes(vm || []);
        setMargenProductos(mp || []);
        setTopVendidos(tv || []);
        setResumen(rg || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const cargarDetalleProducto = async (nombre) => {
    try {
      const detalle = await obtenerDetalleProducto(nombre);
      setDetalleProducto(detalle);
    } catch (err) {
      setError(err.message);
      setDetalleProducto(null);
    }
  };

  return {
    loading,
    error,
    ventasMes,
    margenProductos,
    topVendidos,
    resumen,
    detalleProducto,
    cargarDetalleProducto,
  };
};
