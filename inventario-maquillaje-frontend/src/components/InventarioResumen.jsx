import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Divider,
  Button
} from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

import { obtenerResumenInventario, descargarInventarioExcel } from '../api/inventario';

const InventarioResumen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [datos, setDatos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerResumenInventario();
        setDatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleDescargarExcel = async () => {
    try {
      const blob = await descargarInventarioExcel();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventario.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error al descargar inventario');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            backgroundColor: '#e91e63',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#d81b60',
            },
          }}
          onClick={() => navigate('/productos')}
        >
          Volver a Productos
        </Button>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDescargarExcel}
          sx={{
            borderColor: '#e91e63',
            color: '#fff',
            backgroundColor: '#e91e63',
            fontWeight: 'bold',
            ml: 2,
            '&:hover': {
              backgroundColor: '#c2185b',
              borderColor: '#c2185b',
            },
          }}
        >
          Descargar Inventario
        </Button>
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom color="#e91e63">
        Resumen del Inventario
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          <Inventory2Icon sx={{ verticalAlign: 'middle', mr: 1, color: '#e91e63' }} />
          Tipos de productos: <b>{datos.total_tipos_producto}</b>
        </Typography>
        <Typography variant="h6">
          <MonetizationOnIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#e91e63' }} />
          Valor total del inventario: <b>${datos.total_inventario_COP.toLocaleString()}</b>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Productos en Inventario
        </Typography>
        <List>
          {datos.productos.map((prod, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemIcon>
                  <Inventory2Icon sx={{ color: '#e91e63' }} />
                </ListItemIcon>
                <ListItemText
                  primary={<b>{prod.nombre}</b>}
                  secondary={`Cantidad: ${prod.cantidad}`}
                />
              </ListItem>
              {index < datos.productos.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default InventarioResumen;
