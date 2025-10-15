import React from 'react';
import { Paper, Typography } from '@mui/material';

const MargenVentas = ({ margen }) => (
  <Paper elevation={3} sx={{ mb: 2, p: 2, textAlign: 'center', backgroundColor: '#ffffff', border: '1px solid #172b3dff' }}>
    <Typography variant="body1" fontWeight="bold" sx={{ color: '#172b3dff' }}>
      Margen total de ventas: ${margen} COP
    </Typography>
  </Paper>
);

export default MargenVentas;
