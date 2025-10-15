import React, { useState } from 'react';
import { Box } from '@mui/material';
import SidebarNav from '../components/Nabvar';
import VerVentasTabla from '../components/ventas/VerVentasTabla';

const Ventas = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleOpen = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarNav open={openSidebar} toggleOpen={toggleOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#ffffffff',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          ml: openSidebar ? '200px' : '60px',
          position: 'relative',
        }}
      >
        <VerVentasTabla />
      </Box>
    </Box>
  );
};

export default Ventas;
