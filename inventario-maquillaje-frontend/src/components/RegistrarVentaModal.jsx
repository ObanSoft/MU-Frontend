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

const vendedores = ['Lauren Vanegas', 'Ximena Guerrero', 'Juan Guacaneme', 'Juan Obando'];
const metodosPago = ['Efectivo', 'Nequi'];

const RegistrarVentaModal = ({ open, onClose, onVentaRegistrada }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [vendidoPor, setVendidoPor] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (open) {
      cargarProductos();
      limpiarFormulario();
    }
  }, [open]);

  const cargarProductos = async () => {
    try {
      const nombres = await obtenerProductosDisponibles();
      setProductos(nombres);
    } catch (err) {
      console.error('Error cargando productos', err);
    }
  };

  const limpiarFormulario = () => {
    setProductoSeleccionado('');
    setCantidad(1);
    setVendidoPor('');
    setMetodoPago('');
    setMensaje('');
  };

  const registrarVenta = async () => {
    setCargando(true);
    setMensaje('');
    try {
      const data = await crearVenta({
        nombre_producto: productoSeleccionado,
        cantidad,
        vendido_por: vendidoPor,
        metodo_pago: metodoPago,
      });
      setMensaje(data.mensaje);
      onVentaRegistrada();
      limpiarFormulario();
    } catch (err) {
      setMensaje(err.message || 'Error al registrar venta');
    } finally {
      setCargando(false);
    }
  };

  const handleClose = () => {
    limpiarFormulario();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#e91e63' }}>
        <AddShoppingCartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" color="#e91e63">
          Registrar Venta
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Producto */}
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

        {/* Cantidad */}
        <TextField
          type="number"
          label="Cantidad"
          fullWidth
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          inputProps={{ min: 1 }}
          sx={{
            mb: 2,
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        />

        {/* Vendido por */}
        <TextField
          select
          fullWidth
          label="Vendido por"
          value={vendidoPor}
          onChange={(e) => setVendidoPor(e.target.value)}
          sx={{
            mb: 2,
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        >
          {vendedores.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </TextField>

        {/* Método de pago */}
        <TextField
          select
          fullWidth
          label="Método de pago"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          sx={{
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        >
          {metodosPago.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </TextField>

        {/* Mensaje */}
        {mensaje && (
          <Alert sx={{ mt: 2 }} severity={mensaje.includes('exitosamente') ? 'success' : 'error'}>
            {mensaje}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ color: '#e91e63', fontWeight: 'bold' }}
        >
          Cancelar
        </Button>
        <Button
          onClick={registrarVenta}
          variant="contained"
          disabled={cargando || !productoSeleccionado || !vendidoPor || !metodoPago}
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
