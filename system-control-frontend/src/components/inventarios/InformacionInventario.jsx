import React from 'react';
import { Paper, Typography } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const InventarioInfo = ({ totalTipos, totalValor }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
    <Typography variant="h6" gutterBottom>
      <Inventory2Icon sx={{ verticalAlign: 'middle', mr: 1, color: '#172b3dff' }} />
      Tipos de productos: <b>{totalTipos}</b>
    </Typography>
    <Typography variant="h6">
      <MonetizationOnIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#172b3dff' }} />
      Valor total del inventario:{' '}
      <b>${Number(totalValor).toLocaleString()}</b>
    </Typography>
  </Paper>
);

export default InventarioInfo;
