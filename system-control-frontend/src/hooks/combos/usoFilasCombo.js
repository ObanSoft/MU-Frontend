import { useState } from "react";

export const useFilasCombo = (productosDetalle) => {
  const [filas, setFilas] = useState([{ nombre: "", cantidad: 1 }]);

  const agregarFila = () =>
    setFilas((prev) => [...prev, { nombre: "", cantidad: 1 }]);

  const quitarFila = (index) =>
    setFilas((prev) => prev.filter((_, i) => i !== index));

  const actualizarFila = (index, campo, valor) =>
    setFilas((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [campo]: valor } : f))
    );

  const calcularTotalAproximado = () => {
    let total = 0;
    for (const fila of filas) {
      if (!fila.nombre) continue;
      const cantidad = Number(fila.cantidad) || 0;
      const prod = productosDetalle.find(
        (p) => p.nombre === fila.nombre && p.estado === "inventario"
      );
      if (prod) total += parseFloat(prod.precio) * cantidad;
    }
    return total;
  };

  const totalAprox = calcularTotalAproximado();

  return {
    filas,
    agregarFila,
    quitarFila,
    actualizarFila,
    totalAprox,
  };
};
