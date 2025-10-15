import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';

import { useProductos } from '../../hooks/productos/usoProductos';
import BarraBuscarProducto from './BarraBuscarProducto';
import TablaProductos from './TablaProductos';

const BuscarProductos = () => {
  const [nombre, setNombre] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const {
    productos,
    loading,
    mensaje,
    selectedProduct,
    setSelectedProduct,
    snackbar,
    setSnackbar,
    buscarProducto,
    eliminarProducto,
  } = useProductos();

  const handleBuscar = () => buscarProducto(nombre);

  const handleEliminar = (producto) => {
    setSelectedProduct(producto);
    setConfirmOpen(true);
  };

  const confirmarEliminacion = () => {
    eliminarProducto(selectedProduct.identificador_unico);
    setConfirmOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bolder" color="#172b3dff">
          Buscar Productos
        </Typography>

        <Button
          variant="contained"
          startIcon={<InventoryIcon />}
          onClick={() => navigate('/inventarios')}
          sx={{
            backgroundColor: '#172b3dff',
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#0f1e2d' },
          }}
        >
          INVENTARIO
        </Button>
      </Box>

      <BarraBuscarProducto nombre={nombre} setNombre={setNombre} onBuscar={handleBuscar} loading={loading} />

      {loading ? (
        <CircularProgress />
      ) : mensaje ? (
        <Typography color="error">{mensaje}</Typography>
      ) : (
        <TablaProductos productos={productos} onEliminar={handleEliminar} />
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#172b3dff' }}>
          <WarningAmberIcon sx={{ mr: 1 }} /> Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el producto <b>{selectedProduct?.nombre}</b>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={confirmarEliminacion}
            variant="contained"
            sx={{
              backgroundColor: '#172b3dff',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#172b3dff' },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.tipo} sx={{ width: '100%' }}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BuscarProductos;