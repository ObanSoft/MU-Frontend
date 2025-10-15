import { useState, useEffect } from "react";
import { obtenerVentas} from "../../api/ventas/obtenerVentas";
import { obtenerVentasPorNombre } from '../../api/ventas/obtenerVentasNombre'
import { obtenerVentaPorId } from '../../api/ventas/obtenerVentasIdentificador'
import { obtenerMargenCombos } from '../../api/combos/obtenerMargenCombos'
import { descargarExcelCombos } from "../../api/combos/descargarCombos";

export const useCombos = () => {
  const [combos, setCombos] = useState([]);
  const [margen, setMargen] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarCombos();
    cargarMargen();
  }, []);

  const cargarCombos = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentas();
      setCombos(data.filter(v => v.tipo_venta === "Combo"));
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarMargen = async () => {
    try {
      const total = await obtenerMargenCombos();
      setMargen(total.toFixed(2));
    } catch (error) {
      console.error("Error al obtener margen combos:", error.message);
    }
  };

  const buscarCombo = async (busqueda) => {
    setLoading(true);
    try {
      if (!busqueda.trim()) {
        await cargarCombos();
        await cargarMargen();
        return;
      }

      let data = [];
      if (/^[A-Z0-9-]{8,36}$/i.test(busqueda)) {
        data = await obtenerVentaPorId(busqueda);
      } else {
        data = await obtenerVentasPorNombre(busqueda);
      }

      setCombos(data.filter(v => v.tipo_venta === "Combo"));
      await cargarMargen();
    } catch (error) {
      setCombos([]);
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const exportarExcel = () => descargarExcelCombos();

  return {
    combos,
    margen,
    loading,
    mensaje,
    buscarCombo,
    cargarCombos,
    cargarMargen,
    exportarExcel,
  };
};
