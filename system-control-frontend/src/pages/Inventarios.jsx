import React from 'react';
import { Box } from '@mui/material';
import SidebarNav from '../components/Nabvar';
import InventarioResumen from '../components/inventarios/InventarioResumen';

const Inventarios = () => {
  const [openSidebar, setOpenSidebar] = React.useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarNav open={openSidebar} toggleOpen={() => setOpenSidebar(!openSidebar)} />

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
        <InventarioResumen />
      </Box>
    </Box>
  );
};

export default Inventarios;