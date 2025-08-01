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
import { useNavigate } from 'react-router-dom'; 
import { obtenerResumenInventario } from '../api/inventario';

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
        sx={{
          backgroundColor: '#e91e63',
          color: '#fff',
          mb: 2,
          '&:hover': {
            backgroundColor: '#d81b60',
          },
        }}
        onClick={() => navigate('/productos')}
      >
        Volver a Productos
      </Button>

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
