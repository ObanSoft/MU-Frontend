import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { DataGrid } from '@mui/x-data-grid';

import RegistrarVentaModal from '../components/RegistrarVentaModal';

import {
  obtenerVentas,
  obtenerVentasPorNombre,
  obtenerVentaPorId,
  obtenerMargenVentas,
} from '../api/ventas';

const localeText = {
  noRowsLabel: 'No hay ventas registradas',
  footerTotalRows: 'Total de ventas:',
  paginationLabelRowsPerPage: 'Filas por página:',
};

const VerVentasTabla = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [margen, setMargen] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    cargarTodasLasVentas();
    cargarMargen();
  }, []);

  const cargarTodasLasVentas = async () => {
    setLoading(true);
    try {
      const data = await obtenerVentas();
      const conId = data.map((v, idx) => ({ ...v, id: idx }));
      setVentas(conId);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarMargen = async () => {
    try {
      const total = await obtenerMargenVentas();
      setMargen(total.toFixed(2));
    } catch (error) {
      console.error('Error al obtener el margen:', error.message);
    }
  };

  const handleBuscar = async () => {
    setLoading(true);
    setMensaje('');
    try {
      if (!busqueda.trim()) {
        await cargarTodasLasVentas();
        return;
      }

      if (/^[A-Z0-9\-]{8,}$/i.test(busqueda)) {
        const data = await obtenerVentaPorId(busqueda);
        const conId = data.map((v, idx) => ({ ...v, id: idx }));
        setVentas(conId);
      } else {
        const data = await obtenerVentasPorNombre(busqueda);
        const conId = data.map((v, idx) => ({ ...v, id: idx }));
        setVentas(conId);
      }
    } catch (error) {
      setVentas([]);
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columnas = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'identificador_unico', headerName: 'Código', width: 150 },
    { field: 'nombre_producto', headerName: 'Producto', width: 200 },
    { field: 'precio', headerName: 'Precio (COP)', width: 130 },
    { field: 'fecha_venta', headerName: 'Fecha de venta', width: 180 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="#e91e63">
          Historial de Ventas
        </Typography>
        <ReceiptLongIcon sx={{ fontSize: 32, color: '#e91e63' }} />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          startIcon={<AddShoppingCartIcon />}
          sx={{
            backgroundColor: '#e91e63',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#c2185b',
            },
          }}
        >
          Registrar Venta
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Nombre o código de producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          fullWidth
          sx={{
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        />
        <Button
          variant="contained"
          onClick={handleBuscar}
          startIcon={<SearchIcon />}
          sx={{
            backgroundColor: '#e91e63',
            color: 'white',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#c2185b' },
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
          textAlign: 'center',
          backgroundColor: '#fdeef4',
          border: '1px solid #f48fb1',
        }}
      >
        <Typography variant="body1" fontWeight="bold" sx={{ color: '#e91e63' }}>
          Margen total de ventas: ${margen} COP
        </Typography>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : mensaje ? (
        <Alert severity="error">{mensaje}</Alert>
      ) : (
        <DataGrid
          rows={ventas}
          columns={columnas}
          getRowId={(row) => row.id}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          localeText={localeText}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fce4ec',
              fontWeight: 'bold',
            },
          }}
        />
      )}

      <RegistrarVentaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onVentaRegistrada={async () => {
          await cargarTodasLasVentas();
          await cargarMargen();
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default VerVentasTabla;
