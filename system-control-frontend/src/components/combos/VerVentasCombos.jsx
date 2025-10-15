import React, { useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCombos } from "../../hooks/combos/usoCombos";
import ComboToolbar from "./ComboToolbar";
import RegistrarVentaComboModal from "./RegistrarVentaComboModal";

const localeText = {
  noRowsLabel: "No hay combos registrados",
  footerTotalRows: "Total de combos:",
};

const VerCombos = () => {
  const { combos, margen, loading, mensaje, buscarCombo, exportarExcel, cargarCombos, cargarMargen } =
    useCombos();

  const [modalOpen, setModalOpen] = useState(false);

  const columnas = [
    { field: "identificador_unico", headerName: "Código", width: 150 },
    { field: "nombre_producto", headerName: "Combo", width: 200 },
    { field: "precio", headerName: "Precio (COP)", width: 130 },
    { field: "fecha_venta", headerName: "Fecha de venta", width: 180 },
    { field: "vendido_por", headerName: "Vendido por", width: 150 },
    { field: "metodo_pago", headerName: "Método de pago", width: 130 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" color="#172b3dff" mb={2}>
        Ventas de Combos
      </Typography>

      {/* Barra superior (buscar, registrar, exportar) */}
      <ComboToolbar
        margen={margen}
        onBuscar={buscarCombo}
        onRegistrar={() => setModalOpen(true)}
        onExportar={exportarExcel}
      />

      {/* Tabla */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#172b3dff" }} />
        </Box>
      ) : mensaje ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {mensaje}
        </Alert>
      ) : (
        <DataGrid
          rows={combos}
          getRowId={(row) => row.identificador_unico}
          columns={columnas}
          autoHeight
          pageSize={5}
          localeText={localeText}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            mt: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fce4ec",
              fontWeight: "bold",
              color: "#172b3dff",
            },
          }}
        />
      )}

      <RegistrarVentaComboModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComboRegistrado={async () => {
          await cargarCombos();
          await cargarMargen();
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default VerCombos;
