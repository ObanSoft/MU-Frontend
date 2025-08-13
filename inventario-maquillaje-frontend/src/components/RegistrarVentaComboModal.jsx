import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { obtenerProductosDisponibles } from '../api/ventas';
import { obtenerTodosLosProductos } from '../api/productos';
import { crearVentaCombo } from '../api/ventasCombos';

const VENDEDOR_OPTIONS = [
  'Lauren Vanegas',
  'Ximena Guerrero',
  'Juan Guacaneme',
  'Juan Obando',
];

const METODO_PAGO_OPTIONS = ['Efectivo', 'Nequi'];
const DESCUENTOS_VALIDOS = [0, 3, 5, 7, 10];

export default function RegistrarVentaComboModal({ open, onClose, onComboRegistrado }) {
  const [nombreCombo, setNombreCombo] = useState('');
  const [filas, setFilas] = useState([{ nombre: '', cantidad: 1 }]);
  const [productosNombres, setProductosNombres] = useState([]);
  const [productosDetalle, setProductosDetalle] = useState([]);
  const [vendidoPor, setVendidoPor] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const pinkInputStyle = {
    '& .MuiOutlinedInput-root': {
      fontSize: '1rem',
      padding: '8px 10px',
      '&.Mui-focused fieldset': {
        borderColor: '#e91e63',
        borderWidth: 2,
      },
    },
    '& label': {
      fontWeight: 'bold',
      fontSize: '1rem',
      paddingLeft: '4px',
    },
    '& label.Mui-focused': {
      color: '#e91e63',
    },
  };

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      setLoadingProductos(true);
      try {
        const nombres = await obtenerProductosDisponibles();
        setProductosNombres(nombres || []);
      } catch {
        setProductosNombres([]);
      }

      try {
        const productos = await obtenerTodosLosProductos();
        setProductosDetalle(productos || []);
      } catch {
        setProductosDetalle([]);
      } finally {
        setLoadingProductos(false);
      }
    };

    load();
  }, [open]);

  const agregarFila = () => setFilas(prev => [...prev, { nombre: '', cantidad: 1 }]);
  const quitarFila = index => setFilas(prev => prev.filter((_, i) => i !== index));
  const actualizarFila = (index, campo, valor) =>
    setFilas(prev => prev.map((f, i) => (i === index ? { ...f, [campo]: valor } : f)));

  const calcularTotalAproximado = () => {
    let total = 0;
    for (const fila of filas) {
      if (!fila.nombre) continue;
      const cantidad = Number(fila.cantidad) || 0;
      const prod = productosDetalle.find(p => p.nombre === fila.nombre && p.estado === 'inventario');
      if (prod) total += parseFloat(prod.precio) * cantidad;
    }
    const montoDescuento = (total * Number(descuento || 0)) / 100;
    return total - montoDescuento;
  };

  const validarAntesDeEnviar = () => {
    setErrorMsg('');
    if (!nombreCombo.trim()) {
      setErrorMsg('El nombre del combo es obligatorio.');
      return false;
    }
    if (filas.filter(f => f.nombre.trim()).length < 2) {
      setErrorMsg('Debes incluir al menos 2 productos en el combo.');
      return false;
    }
    if (!VENDEDOR_OPTIONS.includes(vendidoPor)) {
      setErrorMsg('Selecciona un vendedor válido.');
      return false;
    }
    if (!METODO_PAGO_OPTIONS.includes(metodoPago)) {
      setErrorMsg('Selecciona un método de pago válido.');
      return false;
    }
    if (!DESCUENTOS_VALIDOS.includes(Number(descuento))) {
      setErrorMsg('Descuento inválido. Usa 0, 3, 5, 7 o 10.');
      return false;
    }
    for (const f of filas) {
      if (f.nombre && (!Number.isInteger(Number(f.cantidad)) || Number(f.cantidad) < 1)) {
        setErrorMsg('La cantidad debe ser un entero positivo.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validarAntesDeEnviar()) return;

    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      nombre_combo: nombreCombo.trim(),
      productos: filas
        .filter(f => f.nombre.trim())
        .map(f => ({ nombre: f.nombre, cantidad: Number(f.cantidad) })),
      vendido_por: vendidoPor,
      metodo_pago: metodoPago,
      descuento: Number(descuento || 0),
    };

    try {
      await crearVentaCombo(payload);
      if (onComboRegistrado) await onComboRegistrado();
      setNombreCombo('');
      setFilas([{ nombre: '', cantidad: 1 }]);
      setVendidoPor('');
      setMetodoPago('');
      setDescuento(0);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear la venta combo.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalAprox = calcularTotalAproximado();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 1,
          p: 2,
          minWidth: 600,
          maxWidth: 800,
          maxHeight: '70vh',
        },
      }}
    >
      {/* Título principal rosado */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#e91e63',
          fontWeight: 'bold',
          fontSize: '1.8rem',
          pb: 1,
          borderBottom: '2px solid #e91e63',
        }}
      >
        <span>Registrar Combo</span>
        <IconButton onClick={onClose} size="medium" sx={{ color: '#000' }}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3, pb: 1 }}>
        {/* Nombre Combo */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Nombre del combo"
            value={nombreCombo}
            onChange={e => setNombreCombo(e.target.value)}
            fullWidth
            disabled={submitting}
            sx={pinkInputStyle}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Box>

        <Typography
          variant="h6"
          sx={{ mb: 2, color: '#000000', fontWeight: 'bold', letterSpacing: 1 }}
        >
          Productos del combo
        </Typography>

        {loadingProductos ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#e91e63' }} size={30} />
          </Box>
        ) : (
          filas.map((fila, idx) => (
            <Grid container spacing={2} key={idx} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={8}>
                <FormControl fullWidth sx={pinkInputStyle} size="small">
                  <InputLabel sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Producto
                  </InputLabel>
                  <Select
                    value={fila.nombre}
                    label="Producto"
                    onChange={e => actualizarFila(idx, 'nombre', e.target.value)}
                    disabled={submitting}
                    sx={{ fontSize: '1rem', color: fila.nombre ? 'inherit' : 'rgba(0,0,0,0.5)' }}
                  >
                    <MenuItem value="">
                      <em>-- seleccionar --</em>
                    </MenuItem>
                    {productosNombres.map(n => (
                      <MenuItem key={`${n}-${idx}`} value={n} sx={{ fontSize: '1rem' }}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Cantidad"
                  type="number"
                  inputProps={{ min: 1, style: { fontSize: '1rem', padding: '8px 10px' } }}
                  value={fila.cantidad}
                  onChange={e => actualizarFila(idx, 'cantidad', Math.max(1, Number(e.target.value)))}
                  fullWidth
                  disabled={submitting}
                  sx={pinkInputStyle}
                  InputLabelProps={{
                    shrink: true,
                    style: { fontWeight: 'bold', fontSize: '1rem'},
                  }}
                  size="small"
                />
              </Grid>

              <Grid item xs={1} sx={{ textAlign: 'center' }}>
                {idx === 0 ? (
                  <IconButton onClick={agregarFila} size="medium" disabled={submitting} sx={{ color: '#e91e63' }}>
                    <AddCircleOutlineIcon fontSize="medium" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => quitarFila(idx)} size="medium" disabled={submitting} sx={{ color: '#e91e63' }}>
                    <RemoveCircleOutlineIcon fontSize="medium" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))
        )}

        {/* Vendedor y método de pago */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <FormControl fullWidth sx={pinkInputStyle} size="small">
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                Vendido por
              </InputLabel>
              <Select
                value={vendidoPor}
                label="Vendido por"
                onChange={e => setVendidoPor(e.target.value)}
                disabled={submitting}
                sx={{ fontSize: '1rem', color: 'text.primary' }}
              >
                <MenuItem value="">
                  <em>-- seleccionar --</em>
                </MenuItem>
                {VENDEDOR_OPTIONS.map(v => (
                  <MenuItem key={v} value={v} sx={{ fontSize: '1rem' }}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth sx={pinkInputStyle} size="small">
              <InputLabel sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                Método de pago
              </InputLabel>
              <Select
                value={metodoPago}
                label="Método de pago"
                onChange={e => setMetodoPago(e.target.value)}
                disabled={submitting}
                sx={{ fontSize: '1rem', color: 'text.primary' }}
              >
                <MenuItem value="">
                  <em>-- seleccionar --</em>
                </MenuItem>
                {METODO_PAGO_OPTIONS.map(m => (
                  <MenuItem key={m} value={m} sx={{ fontSize: '1rem' }}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3}}>
          <Typography
            component="legend"
            sx={{ mb: 1, color: '#000000', fontWeight: 'bold', fontSize: '1.1rem' }}
          >
            Descuento (%)
          </Typography>
          <FormGroup row>
            {DESCUENTOS_VALIDOS.map(d => (
              <FormControlLabel
                key={d}
                control={
                  <Checkbox
                    sx={{
                      color: '#e91e63',
                      '&.Mui-checked': {
                        color: '#e91e63',
                      },
                      transform: 'scale(1.2)',
                    }}
                    checked={descuento === d}
                    onChange={() => setDescuento(d)}
                  />
                }
                label={`${d}%`}
                sx={{ fontSize: '1.1rem', color: 'text.primary', marginRight: 2 }}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Total aproximado */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4a4a4a' }}>
            Total aproximado:{' '}
            <span style={{ color: '#e91e63' }}>
              ${Number(totalAprox || 0).toFixed(2)}
            </span>
          </Typography>
        </Box>

        {/* Mensaje de error */}
        {errorMsg && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: '#fdecea',
              color: '#b00020',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CancelOutlinedIcon fontSize="medium" />
            {errorMsg}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          disabled={submitting}
          startIcon={<CancelOutlinedIcon />}
          sx={{
                color: '#ffffff',            
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: 2,
                border: '2px solid #e91e63', 
                backgroundColor: '#e91e63',  
                px: 3,
                py: 0.8,
                '&:hover': {
                    backgroundColor: '#c2185b', 
                    borderColor: '#c2185b',     
                    color: '#ffffff',           
                },
                }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          startIcon={<CheckCircleOutlineIcon />}
          sx={{
            backgroundColor: '#e91e63',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: 2,
            px: 4,
            py: 0.8,
            boxShadow: '0 3px 8px rgba(233, 30, 99, 0.6)',
            '&:hover': {
              backgroundColor: '#c2185b',
              boxShadow: '0 4px 12px rgba(194, 24, 91, 0.8)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {submitting ? <CircularProgress size={22} color="inherit" /> : 'Registrar Combo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
