import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductSearch from '../components/productos/BuscarProductos';
import AgregarProductoModal from '../components/productos/RegistrarProductoModal';
import SidebarNav from '../components/Nabvar';

const Productos = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleOpen = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleProductoAgregado = () => {
    console.log('Producto agregado correctamente');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarNav open={openSidebar} toggleOpen={toggleOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          ml: openSidebar ? '200px' : '60px',
          position: 'relative'
        }}
      >
        <ProductSearch />
        <AgregarProductoModal onProductoAgregado={handleProductoAgregado} />
      </Box>
    </Box>
  );
};

export default Productos;
