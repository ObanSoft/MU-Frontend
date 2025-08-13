import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DownloadIcon from "@mui/icons-material/Download"; // 🔹 Nuevo icono
import { DataGrid } from "@mui/x-data-grid";

import { obtenerVentas, obtenerVentasPorNombre, obtenerVentaPorId } from "../api/ventas";
import { obtenerMargenCombos } from "../api/ventasCombos";
import RegistrarVentaComboModal from "./RegistrarVentaComboModal";

const localeText = {
  noRowsLabel: "No hay combos registrados",
  footerTotalRows: "Total de combos:",
  paginationLabelRowsPerPage: "Filas por página:"
};

const VerVentasCombos = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [margen, setMargen] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    cargarCombos();
    cargarMargen();
  }, []);

  const cargarCombos = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentas();
      const filtrados = data.filter(v => v.tipo_venta === "Combo");
      setCombos(filtrados);
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
      console.error('Error al obtener margen combos:', error.message);
    }
  };

  const handleBuscar = async () => {
    setLoading(true);
    setMensaje("");
    try {
      if (!busqueda.trim()) {
        await cargarCombos();
        await cargarMargen();
        return;
      }

      if (/^[A-Z0-9\-]{8,36}$/i.test(busqueda)) {
        const data = await obtenerVentaPorId(busqueda);
        const filtrados = Array.isArray(data) ? data.filter(v => v.tipo_venta === "Combo") : [];
        setCombos(filtrados);
      } else {
        const data = await obtenerVentasPorNombre(busqueda);
        const filtrados = data.filter(v => v.tipo_venta === "Combo");
        setCombos(filtrados);
      }
      await cargarMargen();
    } catch (error) {
      setCombos([]);
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const descargarExcelCombos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/reportes/exportar_combos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Error al descargar el archivo Excel');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte_combos.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el Excel:', error.message);
      alert('Hubo un problema al descargar el archivo.');
    }
  };

  const columnas = [
    { field: "identificador_unico", headerName: "Código", width: 150 },
    { field: "nombre_producto", headerName: "Combo", width: 200 },
    { field: "precio", headerName: "Precio (COP)", width: 130 },
    { field: "fecha_venta", headerName: "Fecha de venta", width: 180 },
    { field: "vendido_por", headerName: "Vendido por", width: 150 },
    { field: "metodo_pago", headerName: "Método de pago", width: 130 },
    { field: "tipo_venta", headerName: "Tipo de venta", width: 150 }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="#e91e63">
          Ventas de Combos
        </Typography>
      </Box>

      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          startIcon={<AddShoppingCartIcon />}
          sx={{
            backgroundColor: "#e91e63",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#c2185b" }
          }}
        >
          Registrar Combo
        </Button>

        <Button
          variant="contained"
          onClick={descargarExcelCombos}
          startIcon={<DownloadIcon />}
          sx={{
            backgroundColor: "#e91e63",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#c2185b" }
          }}
        >
          Exportar Combos
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Nombre o código de combo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#e91e63',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#e91e63',
                borderWidth: 2,
              },
            },
            '& label.Mui-focused': {
              color: '#e91e63',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleBuscar}
          startIcon={<SearchIcon />}
          sx={{
            backgroundColor: "#e91e63",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#c2185b" }
          }}
        >
          Buscar
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          mb: 2,
          p: 2,
          textAlign: "center",
          backgroundColor: "#fdeef4",
          border: "1px solid #f48fb1"
        }}
      >
        <Typography variant="body1" fontWeight="bold" sx={{ color: "#e91e63" }}>
          Margen total de combos: ${margen} COP
        </Typography>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : mensaje ? (
        <Alert severity="error">{mensaje}</Alert>
      ) : (
        <DataGrid
          rows={combos}
          getRowId={(row) => row.identificador_unico} 
          columns={columnas}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          localeText={localeText}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#fce4ec",
              fontWeight: "bold"
            }
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

export default VerVentasCombos;
