import { useState } from "react";
import { useCargarProductosCombo } from "./usoCargarProductosCombo";
import { useFilasCombo } from "./usoFilasCombo";
import { useValidarCombo } from "./usoValidarCombo";
import { useSubmitCombo } from "./usoEntregarCombo";

export const useRegistrarCombo = (open, onClose, onComboRegistrado) => {
  const [nombreCombo, setNombreCombo] = useState("");
  const [vendidoPor, setVendidoPor] = useState("");
  const [metodoPago, setMetodoPago] = useState("");

  const { productosNombres, productosDetalle, loadingProductos } =
    useCargarProductosCombo(open);

  const { filas, agregarFila, quitarFila, actualizarFila, totalAprox } =
    useFilasCombo(productosDetalle);

  const { errorMsg, setErrorMsg, validarAntesDeEnviar } = useValidarCombo();

  const { submitting, handleSubmit } = useSubmitCombo(onComboRegistrado, onClose);

  const pinkInputStyle = {
    "& .MuiOutlinedInput-root": {
      fontSize: "1.1rem",
      padding: "10px 12px",
      "&.Mui-focused fieldset": {
        borderColor: "#172b3dff",
        borderWidth: 2,
      },
    },
    "& label": {
      fontWeight: "bold",
      fontSize: "1.05rem",
    },
    "& label.Mui-focused": {
      color: "#172b3dff",
    },
  };

  return {
    nombreCombo,
    setNombreCombo,
    filas,
    agregarFila,
    quitarFila,
    actualizarFila,
    productosNombres,
    productosDetalle,
    vendidoPor,
    setVendidoPor,
    metodoPago,
    setMetodoPago,
    loadingProductos,
    submitting,
    errorMsg,
    pinkInputStyle,
    totalAprox,
    handleSubmit: () =>
      handleSubmit(
        nombreCombo,
        filas,
        vendidoPor,
        metodoPago,
        validarAntesDeEnviar,
        setErrorMsg
      ),
  };
};
