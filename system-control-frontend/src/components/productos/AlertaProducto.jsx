import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ProductoAlert = ({ alerta, onClose }) => (
  <Snackbar open={alerta.open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ zIndex: 1500 }}>
    <Alert onClose={onClose} severity={alerta.tipo} variant="filled" sx={{ width: '100%', maxWidth: '600px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '12px', py: 2, px: 3, boxShadow: 3, textAlign: 'center' }}>
      {alerta.mensaje}
    </Alert>
  </Snackbar>
);

export default ProductoAlert;
