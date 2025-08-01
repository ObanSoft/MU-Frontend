import React, { useState } from 'react';
import { Box } from '@mui/material';
import ProductSearch from '../components/ProductSearch';
import SidebarNav from '../components/SidebarNav';
import AgregarProductoModal from '../components/AgregarProductoModal';

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
          backgroundColor: '#f8f8f8',
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
