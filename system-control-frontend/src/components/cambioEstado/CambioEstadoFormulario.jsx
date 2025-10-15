import React from "react";
import { Box, Divider, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ProductoEstadoForm } from "./CambioEstadoVenta";
import { ComboEstadoForm } from "./CambioEstadoCombo";
import { SnackbarFeedback } from "./Notificaciones";

export const CambioEstadoForm = ({
  codigo,
  setCodigo,
  identificadorCombo,
  setIdentificadorCombo,
  handleCambioEstado,
  handleDisolverCombo,
  snackbar,
  setSnackbar,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, backgroundColor: "#fff", minHeight: "100vh" }}>
      <ProductoEstadoForm
        codigo={codigo}
        setCodigo={setCodigo}
        handleCambioEstado={handleCambioEstado}
      />

      <Divider sx={{ mb: 4 }} />

      <ComboEstadoForm
        identificadorCombo={identificadorCombo}
        setIdentificadorCombo={setIdentificadorCombo}
        handleDisolverCombo={handleDisolverCombo}
      />

      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/productos")}
        sx={{
          backgroundColor: "#172b3dff",
          color: "white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#172b3dff",
          },
        }}
      >
        Volver a productos
      </Button>

      <SnackbarFeedback snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
};
