import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const ListaProductosInventario = ({ productos }) => (
  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
    <Typography variant="h6" gutterBottom>
      Productos en Inventario
    </Typography>
    <List>
      {productos.map((prod, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemIcon>
              <Inventory2Icon sx={{ color: '#172b3dff' }} />
            </ListItemIcon>
            <ListItemText
              primary={<b>{prod.nombre}</b>}
              secondary={`Cantidad: ${prod.cantidad}`}
            />
          </ListItem>
          {index < productos.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

export default ListaProductosInventario;
