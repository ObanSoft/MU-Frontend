import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { obtenerProductosDisponibles, crearVenta } from '../api/ventas';

const RegistrarVentaModal = ({ open, onClose, onVentaRegistrada }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (open) cargarProductos();
  }, [open]);

  const cargarProductos = async () => {
    try {
      const nombres = await obtenerProductosDisponibles();
      setProductos(nombres);
    } catch (err) {
      console.error('Error cargando productos', err);
    }
  };

  const registrarVenta = async () => {
    setCargando(true);
    setMensaje('');
    try {
      const data = await crearVenta(productoSeleccionado, cantidad);
      setMensaje(data.mensaje);
      onVentaRegistrada();
    } catch (err) {
      setMensaje(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#e91e63' }}>
        <AddShoppingCartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" color="#e91e63">
          Registrar Venta
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label="Producto"
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
          sx={{
            mt: 2,
            mb: 2,
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        >
          {productos.map((nombre) => (
            <MenuItem key={nombre} value={nombre}>
              {nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="number"
          label="Cantidad"
          fullWidth
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          inputProps={{ min: 1 }}
          sx={{
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        />

        {mensaje && (
          <Alert sx={{ mt: 2 }} severity={mensaje.includes('exitosamente') ? 'success' : 'error'}>
            {mensaje}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ color: '#e91e63', fontWeight: 'bold' }}
        >
          Cancelar
        </Button>
        <Button
          onClick={registrarVenta}
          variant="contained"
          disabled={cargando || !productoSeleccionado}
          sx={{
            backgroundColor: '#e91e63',
            color: 'white',
            '&:hover': { backgroundColor: '#c2185b' },
          }}
        >
          {cargando ? <CircularProgress size={24} /> : 'Registrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrarVentaModal;
