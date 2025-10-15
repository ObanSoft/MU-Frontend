import React from 'react';
import { Box, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DownloadIcon from '@mui/icons-material/Download';

const AccionesVentas = ({ abrirModal, exportarExcel }) => (
  <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
    <Button
      variant="contained"
      onClick={abrirModal}
      startIcon={<AddShoppingCartIcon />}
      sx={{ backgroundColor: '#172b3dff', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: '#172b3dff' } }}
    >
      Registrar Venta
    </Button>

    <Button
      variant="contained"
      onClick={exportarExcel}
      startIcon={<DownloadIcon />}
      sx={{ backgroundColor: '#172b3dff', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: '#172b3dff' } }}
    >
      Descargar Ventas
    </Button>
  </Box>
);

export default AccionesVentas;
