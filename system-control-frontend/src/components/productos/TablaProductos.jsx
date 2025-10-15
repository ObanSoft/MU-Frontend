import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TablaProductos = ({ productos, onEliminar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event, producto) => {
    setSelectedProduct(producto);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEliminarClick = () => {
    if (selectedProduct) onEliminar(selectedProduct);
    handleMenuClose();
  };

  const columnas = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'header-bold' },
    { field: 'identificador_unico', headerName: 'Código', width: 130, headerClassName: 'header-bold' },
    { field: 'nombre', headerName: 'Nombre', width: 200, headerClassName: 'header-bold' },
    { field: 'precio', headerName: 'Precio', width: 100, headerClassName: 'header-bold' },
    { field: 'estado', headerName: 'Estado', width: 120, headerClassName: 'header-bold' },
    { field: 'fecha_creacion', headerName: 'Creado', width: 180, headerClassName: 'header-bold' },
    {
      field: 'acciones',
      headerName: '',
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
          <MoreVertIcon sx={{ color: '#172b3dff' }} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={productos}
        columns={columnas}
        pagination
        pageSizeOptions={[25, 50, 100]}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 25, page: 0 } }
        }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEliminarClick}>
          <ListItemIcon>
            <DeleteForeverIcon sx={{ color: '#172b3dff' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }}>
            Eliminar producto
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TablaProductos;