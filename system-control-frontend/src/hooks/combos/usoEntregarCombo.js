import { useState } from "react";
import { crearVentaCombo } from "../../api/combos/crearVentaCombo";

export const useSubmitCombo = (onComboRegistrado, onClose) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    nombreCombo,
    filas,
    vendidoPor,
    metodoPago,
    validarAntesDeEnviar,
    setErrorMsg
  ) => {
    if (!validarAntesDeEnviar(nombreCombo, filas, vendidoPor, metodoPago)) return;

    setSubmitting(true);
    setErrorMsg("");

    const payload = {
      nombre_combo: nombreCombo.trim(),
      productos: filas
        .filter((f) => f.nombre.trim())
        .map((f) => ({ nombre: f.nombre, cantidad: Number(f.cantidad) })),
      vendido_por: vendidoPor,
      metodo_pago: metodoPago,
    };

    try {
      await crearVentaCombo(payload);
      if (onComboRegistrado) await onComboRegistrado();
      onClose();
      return true;
    } catch (err) {
      setErrorMsg(err.message || "Error al crear la venta combo.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, handleSubmit };
};
