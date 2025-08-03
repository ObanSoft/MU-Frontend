import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SidebarNav from '../components/SidebarNav';
import { cambiarEstadoProducto } from '../api/productos';
import { useNavigate } from 'react-router-dom';

const CambioEstado = () => {
  const [codigo, setCodigo] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '', tipo: 'success' });
  const [openSidebar, setOpenSidebar] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  const handleCambioEstado = async () => {
    if (!codigo.trim()) {
      setSnackbar({ open: true, mensaje: 'Debes ingresar un código', tipo: 'error' });
      return;
    }

    try {
      const data = await cambiarEstadoProducto(codigo.trim());
      setSnackbar({ open: true, mensaje: data.mensaje, tipo: 'success' });
    } catch (error) {
      setSnackbar({ open: true, mensaje: error.message, tipo: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarNav open={openSidebar} toggleOpen={toggleSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: '#f8f8f8',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          ml: openSidebar ? '200px' : '60px',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} color='#e91e63'>
          Cambiar estado de producto
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, maxWidth: 500, mb: 4 }}>
          <TextField
            label="Código del producto"
            fullWidth
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            sx={{
              '& label.Mui-focused': { color: '#e91e63' },
              '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AutorenewIcon />}
            onClick={handleCambioEstado}
            sx={{
              backgroundColor: '#e91e63',
              '&:hover': { backgroundColor: '#c2185b' },
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Cambiar estado
          </Button>
        </Box>

        <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/productos')}
            sx={{
                backgroundColor: '#e91e63',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                backgroundColor: '#c2185b',
                },
            }}
            >
            Volver a productos
        </Button>


        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.tipo}
            sx={{
              width: '100%',
              fontSize: '1rem',
              p: 2,
              minWidth: 350,
            }}
            variant="filled"
          >
            {snackbar.mensaje}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default CambioEstado;
