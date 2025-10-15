import { useState } from "react";
import { cambiarEstadoProducto } from "../../api/productos/cambiarEstadoVenta"
import { disolverCombo } from "../../api/productos/cambiarEstadoCombo";

export const useCambioEstado = () => {
  const [codigo, setCodigo] = useState("");
  const [identificadorCombo, setIdentificadorCombo] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    mensaje: "",
    tipo: "success",
  });

  const handleCambioEstado = async () => {
    if (!codigo.trim()) {
      setSnackbar({
        open: true,
        mensaje: "Debes ingresar un código",
        tipo: "error",
      });
      return;
    }

    try {
      const data = await cambiarEstadoProducto(codigo.trim());
      setSnackbar({ open: true, mensaje: data.mensaje, tipo: "success" });
    } catch (error) {
      setSnackbar({ open: true, mensaje: error.message, tipo: "error" });
    }
  };

  const handleDisolverCombo = async () => {
    if (!identificadorCombo.trim()) {
      setSnackbar({
        open: true,
        mensaje: "Debes ingresar un identificador de combo",
        tipo: "error",
      });
      return;
    }

    try {
      const data = await disolverCombo(identificadorCombo.trim());
      setSnackbar({ open: true, mensaje: data.mensaje, tipo: "success" });
      setIdentificadorCombo("");
    } catch (error) {
      setSnackbar({ open: true, mensaje: error.message, tipo: "error" });
    }
  };

  return {
    codigo,
    setCodigo,
    identificadorCombo,
    setIdentificadorCombo,
    snackbar,
    setSnackbar,
    handleCambioEstado,
    handleDisolverCombo,
  };
};
