import React from 'react';
import { Box } from '@mui/material';
import SidebarNav from '../components/SidebarNav';
import InventarioResumen from '../components/InventarioResumen';

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
          backgroundColor: '#f8f8f8',
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





