import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

const InventarioHeader = ({ onDescargar }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
        sx={{
          backgroundColor: '#172b3dff',
          color: '#fff',
          '&:hover': { backgroundColor: '#172b3dff' },
        }}
        onClick={() => navigate('/productos')}
      >
        Volver a Productos
      </Button>

      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={onDescargar}
        sx={{
          borderColor: '#172b3dff',
          color: '#fff',
          backgroundColor: '#172b3dff',
          fontWeight: 'bold',
          ml: 2,
          '&:hover': {
            backgroundColor: '#172b3dff',
            borderColor: '#172b3dff',
          },
        }}
      >
        Descargar Inventario
      </Button>
    </Box>
  );
};

export default InventarioHeader;
