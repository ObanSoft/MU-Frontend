import { useEffect, useState } from "react";
import { obtenerProductosDisponibles } from "../../api/ventas/obtenerProductosDisponibles";
import { obtenerTodosLosProductos } from "../../api/productos/obtenerProductos";

export const useCargarProductosCombo = (open) => {
  const [productosNombres, setProductosNombres] = useState([]);
  const [productosDetalle, setProductosDetalle] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(false);

  useEffect(() => {
    if (!open) return;

    let mounted = true;

    const load = async () => {
      try {
        setLoadingProductos(true);

        const nombres = await obtenerProductosDisponibles();
        const productos = await obtenerTodosLosProductos();

        if (!mounted) return;

        setProductosNombres(nombres || []);
        setProductosDetalle(productos || []);
      } catch (err) {
        console.error("Error cargando productos:", err);
        if (mounted) {
          setProductosNombres([]);
          setProductosDetalle([]);
        }
      } finally {
        if (mounted) setLoadingProductos(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [open]);

  return { productosNombres, productosDetalle, loadingProductos };
};
