import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Fade, Backdrop, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useAgregarProducto } from '../../hooks/productos/usoAgregarProductos';
import ProductoForm from './FormularioAgregarProducto';
import ProductoAlert from './AlertaProducto';

const FloatingButton = styled(Button)({
  position: 'fixed', bottom: 30, right: 30, borderRadius: '50%', minWidth: '60px', minHeight: '60px',
  backgroundColor: '#172b3dff', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  '&:hover': { backgroundColor: '#172b3dff' }
});

const modalStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 420, bgcolor: '#fff', borderRadius: 4, boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2 };

const AgregarProductoModal = ({ onProductoAgregado }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: '', precioVenta: '', precioCompra: '', cantidad: 1 });
  const { loading, alerta, registrar, cerrarAlerta } = useAgregarProducto(onProductoAgregado);

  const handleOpen = () => setOpen(true);
  const handleClose = () => { setForm({ nombre: '', precioVenta: '', precioCompra: '', cantidad: 1 }); setOpen(false); };
  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = async (e) => { e.preventDefault(); const exito = await registrar(form); if (exito) handleClose(); };

  return (
    <>
      <FloatingButton onClick={handleOpen}><AddIcon /></FloatingButton>
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 300, sx: { backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' } }}>
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold" color="#000"><AddIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Nuevo Producto</Typography>
              <Button onClick={handleClose} size="small" sx={{ color: '#172b3dff' }}><CloseIcon /></Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <ProductoForm form={form} onChange={handleChange} onSubmit={handleSubmit} loading={loading} onCancel={handleClose} />
          </Box>
        </Fade>
      </Modal>
      <ProductoAlert alerta={alerta} onClose={cerrarAlerta} />
    </>
  );
};

export default AgregarProductoModal;
