import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useInventarioResumen } from '../../hooks/inventarios/usoInventarioResumen';
import InventarioHeader from './BotonesInventario';
import InventarioInfo from './InformacionInventario';
import ListaProductosInventario from './ListaProductosInventario';

const InventarioResumen = () => {
  const { loading, error, datos, handleDescargarExcel } = useInventarioResumen();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <InventarioHeader onDescargar={handleDescargarExcel} />

      <Typography variant="h5" fontWeight="bold" gutterBottom color="#172b3dff">
        Resumen del Inventario
      </Typography>

      <InventarioInfo
        totalTipos={datos.total_tipos_producto}
        totalValor={datos.total_inventario_COP}
      />

      <ListaProductosInventario productos={datos.productos} />
    </Box>
  );
};

export default InventarioResumen;
