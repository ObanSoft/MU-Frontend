import { useState } from "react";

export const VENDEDOR_OPTIONS = ["Lauren Vanegas", "Juan Obando"];
export const METODO_PAGO_OPTIONS = ["Efectivo", "Nequi"];

export const useValidarCombo = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const validarAntesDeEnviar = (nombreCombo, filas, vendidoPor, metodoPago) => {
    setErrorMsg("");
    if (!nombreCombo.trim()) {
      setErrorMsg("El nombre del combo es obligatorio.");
      return false;
    }
    if (filas.filter((f) => f.nombre.trim()).length < 2) {
      setErrorMsg("Debes incluir al menos 2 productos en el combo.");
      return false;
    }
    if (!VENDEDOR_OPTIONS.includes(vendidoPor)) {
      setErrorMsg("Selecciona un vendedor válido.");
      return false;
    }
    if (!METODO_PAGO_OPTIONS.includes(metodoPago)) {
      setErrorMsg("Selecciona un método de pago válido.");
      return false;
    }
    for (const f of filas) {
      if (
        f.nombre &&
        (!Number.isInteger(Number(f.cantidad)) || Number(f.cantidad) < 1)
      ) {
        setErrorMsg("La cantidad debe ser un entero positivo.");
        return false;
      }
    }
    return true;
  };

  return { errorMsg, setErrorMsg, validarAntesDeEnviar };
};
