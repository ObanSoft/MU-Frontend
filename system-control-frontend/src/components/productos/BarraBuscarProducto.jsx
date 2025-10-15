import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BarraBuscarProducto = ({ nombre, setNombre, onBuscar, loading }) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
    <TextField
      label="Nombre o código del producto"
      variant="outlined"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      fullWidth
      sx={{
        '& label.Mui-focused': { color: '#172b3dff' },
        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#172b3dff' },
      }}
    />
    <Button
      variant="contained"
      startIcon={<SearchIcon />}
      onClick={onBuscar}
      disabled={loading}
      sx={{
        backgroundColor: '#172b3dff',
        '&:hover': { backgroundColor: '#172b3dff' },
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      Buscar
    </Button>
  </Box>
);

export default BarraBuscarProducto;
