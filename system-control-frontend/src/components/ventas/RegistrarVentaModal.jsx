import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Alert, Typography
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRegistrarVenta } from '../../hooks/ventas/usoRegistrarVentas';
import CampoSelect from './SeleccionCampo';
import CampoNumero from './CampoNumero';

const vendedores = ['Lauren Vanegas','Juan Obando'];
const metodosPago = ['Efectivo', 'Nequi'];

const RegistrarVentaModal = ({ open, onClose, onVentaRegistrada }) => {
  const {
    productos, productoSeleccionado, setProductoSeleccionado,
    cantidad, setCantidad, vendidoPor, setVendidoPor,
    metodoPago, setMetodoPago, mensaje, cargando,
    registrarVenta, limpiarFormulario
  } = useRegistrarVenta(open, onVentaRegistrada);

  const handleClose = () => { limpiarFormulario(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#172b3dff' }}>
        <AddShoppingCartIcon sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">Registrar Venta</Typography>
      </DialogTitle>
      <DialogContent>
        <CampoSelect label="Producto" value={productoSeleccionado} onChange={e => setProductoSeleccionado(e.target.value)} opciones={productos} />
        <CampoNumero label="Cantidad" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} />
        <CampoSelect label="Vendido por" value={vendidoPor} onChange={e => setVendidoPor(e.target.value)} opciones={vendedores} />
        <CampoSelect label="Método de pago" value={metodoPago} onChange={e => setMetodoPago(e.target.value)} opciones={metodosPago} />
        {mensaje && <Alert sx={{ mt: 2 }} severity={mensaje.includes('exitosamente') ? 'success' : 'error'}>{mensaje}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#b61717ff', fontWeight: 'bold' }}>Cancelar</Button>
        <Button onClick={registrarVenta} variant="contained"
          disabled={cargando || !productoSeleccionado || !vendidoPor || !metodoPago}
          sx={{ backgroundColor: '#172b3dff', color: 'white', '&:hover': { backgroundColor: '#172b3dff' } }}>
          {cargando ? <CircularProgress size={24} /> : 'Registrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrarVentaModal;
