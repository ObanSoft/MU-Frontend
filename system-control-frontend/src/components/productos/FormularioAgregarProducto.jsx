import React from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';

const campoEstilo = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ccc' },
    '&:hover fieldset': { borderColor: '#172b3dff' },
    '&.Mui-focused fieldset': { borderColor: '#172b3dff' }
  },
  '& label.Mui-focused': { color: '#172b3dff' }
};

const ProductoForm = ({ form, onChange, onSubmit, loading, onCancel }) => (
  <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField
      label="Nombre del producto"
      value={form.nombre}
      onChange={(e) => onChange('nombre', e.target.value)}
      required
      InputProps={{ startAdornment: <InputAdornment position="start"><Inventory2OutlinedIcon sx={{ color: '#172b3dff' }} /></InputAdornment> }}
      sx={campoEstilo}
    />
    <TextField
      label="Precio de Venta"
      type="number"
      value={form.precioVenta}
      onChange={(e) => onChange('precioVenta', e.target.value)}
      required
      InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon sx={{ color: '#172b3dff' }} /></InputAdornment> }}
      sx={campoEstilo}
    />
    <TextField
      label="Precio de Compra"
      type="number"
      value={form.precioCompra}
      onChange={(e) => onChange('precioCompra', e.target.value)}
      required
      InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon sx={{ color: '#172b3dff' }} /></InputAdornment> }}
      sx={campoEstilo}
    />
    <TextField
      label="Cantidad"
      type="number"
      value={form.cantidad}
      onChange={(e) => onChange('cantidad', parseInt(e.target.value))}
      required
      inputProps={{ min: 1 }}
      InputProps={{ startAdornment: <InputAdornment position="start"><NumbersIcon sx={{ color: '#172b3dff' }} /></InputAdornment> }}
      sx={campoEstilo}
    />

    <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
      <Button onClick={onCancel} variant="outlined" sx={{ borderColor: '#172b3dff', color: '#172b3dff', '&:hover': { borderColor: '#172b3dff', backgroundColor: '#fce4ec' } }}>
        Cancelar
      </Button>
      <Button type="submit" variant="contained" disabled={loading} sx={{ backgroundColor: '#172b3dff', '&:hover': { backgroundColor: '#172b3dff' }, fontWeight: 'bold' }}>
        {loading ? 'Guardando...' : 'Registrar'}
      </Button>
    </Box>
  </Box>
);

export default ProductoForm;
