import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscadorVentas = ({ busqueda, setBusqueda, buscarVentas }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
    <TextField
      label="Nombre o código de producto"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      fullWidth
      sx={{
        '& label.Mui-focused': { color: '#172b3dff' },
        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#172b3dff' },
      }}
    />
    <Button
      variant="contained"
      onClick={buscarVentas}
      startIcon={<SearchIcon />}
      sx={{ backgroundColor: '#172b3dff', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: '#172b3dff' } }}
    >
      Buscar
    </Button>
  </Box>
);

export default BuscadorVentas;
