import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { useRegistrarCombo } from "../../hooks/combos/usoRegistrarCombo";
import ComboNombreInput from "./NombreInputCombo";
import ComboProductosLista from "./ListaProductosCombo";
import ComboSelectores from "./SelectoresCombo";
import ComboTotalYError from "./ComboTotal";

export default function RegistrarVentaComboModal({ open, onClose, onComboRegistrado }) {
  const {
    nombreCombo,
    setNombreCombo,
    filas,
    agregarFila,
    quitarFila,
    actualizarFila,
    productosNombres,
    productosDetalle,
    loadingProductos,
    vendidoPor,
    setVendidoPor,
    metodoPago,
    setMetodoPago,
    totalAprox,
    errorMsg,
    submitting,
    handleSubmit,
  } = useRegistrarCombo(open, onClose, onComboRegistrado);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 3,
          minWidth: 750,
          maxHeight: "85vh",
          overflowY: "auto",
          backgroundColor: "#fdfdfd",
        },
      }}
    >
      {/* ---------- Header ---------- */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#172b3dff",
          fontWeight: "bold",
          fontSize: "2rem",
          pb: 2,
          borderBottom: "2px solid #172b3dff",
        }}
      >
        Registrar Combo
        <IconButton onClick={onClose} size="large" sx={{ color: "#000" }}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>

      {/* ---------- Contenido ---------- */}
      <DialogContent dividers sx={{ pt: 4, pb: 3 }}>
        <ComboNombreInput nombreCombo={nombreCombo} setNombreCombo={setNombreCombo} submitting={submitting} />

        <ComboProductosLista
          filas={filas}
          agregarFila={agregarFila}
          quitarFila={quitarFila}
          actualizarFila={actualizarFila}
          productosNombres={productosNombres}
          loadingProductos={loadingProductos}
          submitting={submitting}
        />

        <ComboSelectores
          vendidoPor={vendidoPor}
          setVendidoPor={setVendidoPor}
          metodoPago={metodoPago}
          setMetodoPago={setMetodoPago}
          submitting={submitting}
        />

        <ComboTotalYError totalAprox={totalAprox} errorMsg={errorMsg} />
      </DialogContent>

      {/* ---------- Acciones ---------- */}
      <DialogActions sx={{ px: 4, pb: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          disabled={submitting}
          startIcon={<CancelOutlinedIcon />}
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.05rem",
            borderRadius: 2,
            border: "2px solid #b61717ff",
            backgroundColor: "#b61717ff",
            px: 4,
            py: 1,
            "&:hover": {
              backgroundColor: "#b61717ff",
              borderColor: "#b61717ff",
            },
          }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={<CheckCircleOutlineIcon />}
          sx={{
            backgroundColor: "#172b3dff",
            fontWeight: "bold",
            fontSize: "1.05rem",
            borderRadius: 2,
            px: 5,
            py: 1,
            boxShadow: "0 4px 12px rgba(5, 14, 65, 0.6)",
            "&:hover": {
              backgroundColor: "#0f1c2aff",
              boxShadow: "0 5px 15px rgba(5, 14, 65, 0.7)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {submitting ? <CircularProgress size={24} color="inherit" /> : "Registrar Combo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
