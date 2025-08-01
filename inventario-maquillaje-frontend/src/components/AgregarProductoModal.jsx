import React, { useState } from 'react';
import {
  Modal, Box, TextField, Typography, Button, Fade, Backdrop, Divider,
  InputAdornment, Snackbar, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { registrarProducto } from '../api/productos';

const FloatingButton = styled(Button)({
  position: 'fixed',
  bottom: 30,
  right: 30,
  borderRadius: '50%',
  minWidth: '60px',
  minHeight: '60px',
  backgroundColor: '#e91e63',
  color: 'white',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: '#c2185b'
  }
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: '#fff',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2
};

const AgregarProductoModal = ({ onProductoAgregado }) => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const [alerta, setAlerta] = useState({ open: false, mensaje: '', tipo: 'success' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNombre('');
    setPrecio('');
    setCantidad(1);
    setOpen(false);
  };

  const handleAlertClose = () => {
    setAlerta({ ...alerta, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registrarProducto(nombre, precio, cantidad);
      if (onProductoAgregado) onProductoAgregado();
      setAlerta({ open: true, mensaje: 'Producto(s) registrado(s) correctamente.', tipo: 'success' });
      handleClose();
    } catch (err) {
      const msg = err.message.includes('existe') || err.message.includes('nombre')
        ? 'Ya existe un producto con ese nombre.'
        : err.message;
      setAlerta({ open: true, mensaje: msg, tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const campoEstilo = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#ccc' },
      '&:hover fieldset': { borderColor: '#e91e63' },
      '&.Mui-focused fieldset': { borderColor: '#e91e63' }
    },
    '& label.Mui-focused': { color: '#e91e63' }
  };

  return (
    <>
      <FloatingButton onClick={handleOpen}>
        <AddIcon />
      </FloatingButton>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: { backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold" color="#000">
                <AddIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Nuevo Producto
              </Typography>
              <Button onClick={handleClose} size="small" sx={{ color: '#e91e63' }}>
                <CloseIcon />
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Inventory2OutlinedIcon sx={{ color: '#e91e63' }} />
                    </InputAdornment>
                  )
                }}
                sx={campoEstilo}
              />

              <TextField
                label="Precio"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon sx={{ color: '#e91e63' }} />
                    </InputAdornment>
                  )
                }}
                sx={campoEstilo}
              />

              <TextField
                label="Cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                required
                inputProps={{ min: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon sx={{ color: '#e91e63' }} />
                    </InputAdornment>
                  )
                }}
                sx={campoEstilo}
              />

              <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    borderColor: '#e91e63',
                    color: '#e91e63',
                    '&:hover': {
                      borderColor: '#c2185b',
                      backgroundColor: '#fce4ec'
                    }
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: '#e91e63',
                    '&:hover': { backgroundColor: '#c2185b' },
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Guardando...' : 'Registrar'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={alerta.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 1500 }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alerta.tipo}
          variant="filled"
          sx={{
            width: '100%',
            maxWidth: '600px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '12px',
            py: 2,
            px: 3,
            boxShadow: 3,
            textAlign: 'center'
          }}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AgregarProductoModal;
