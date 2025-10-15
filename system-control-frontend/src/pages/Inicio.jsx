import React, { useState } from 'react';
import { Box } from '@mui/material';
import SidebarNav from '../components/Nabvar';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SidebarNav open={isSidebarOpen} toggleOpen={() => setIsSidebarOpen(!isSidebarOpen)} />

      <Box
        sx={{
          flex: 1,
          padding: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        {}
        <h1>Panel de Administración</h1>
        <p>Selecciona una opción del menú lateral para comenzar.</p>
      </Box>
    </Box>
  );
};

export default Home;
