import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import {
  buscarProductosPorNombre,
  obtenerTodosLosProductos,
  consultarProductoPorIdentificador,
  eliminarProductoPorIdentificador,
} from '../api/productos';

const localeText = {
  noRowsLabel: 'No hay filas',
  noResultsOverlayLabel: 'No se encontraron resultados.',
  errorOverlayDefaultLabel: 'Ha ocurrido un error.',
  toolbarDensity: 'Densidad',
  toolbarDensityLabel: 'Densidad',
  toolbarDensityCompact: 'Compacta',
  toolbarDensityStandard: 'Estándar',
  toolbarDensityComfortable: 'Cómoda',
  toolbarColumns: 'Columnas',
  toolbarColumnsLabel: 'Seleccionar columnas',
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Ocultar filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar como CSV',
  columnsPanelTextFieldLabel: 'Buscar columna',
  columnsPanelTextFieldPlaceholder: 'Título de la columna',
  columnsPanelShowAllButton: 'Mostrar todas',
  columnsPanelHideAllButton: 'Ocultar todas',
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : '1 fila seleccionada',
  footerTotalRows: 'Total de filas:',
  columnMenuLabel: 'Menú',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar',
  columnMenuUnsort: 'Quitar orden',
  columnMenuSortAsc: 'Orden ascendente',
  columnMenuSortDesc: 'Orden descendente',
  paginationLabelRowsPerPage: 'Filas por página:',
  paginationLabelDisplayedRows: ({ from, to, count }) =>
    `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
};

const ProductSearch = () => {
  const [nombre, setNombre] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '', tipo: 'success' });

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const datos = await obtenerTodosLosProductos();
        setProductos(datos);
      } catch (error) {
        setMensaje(error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  const handleBuscar = async () => {
    setLoading(true);
    setMensaje('');
    try {
      if (!nombre.trim()) {
        const todos = await obtenerTodosLosProductos();
        setProductos(todos);
      } else if (/^[A-Z0-9]{8,}$/.test(nombre.trim())) {
        try {
          const producto = await consultarProductoPorIdentificador(nombre.trim());
          setProductos([producto]);
        } catch (error) {
          setProductos([]);
          setMensaje(error.message);
        }
      } else {
        const resultados = await buscarProductosPorNombre(nombre);
        setProductos(resultados);
      }
    } catch (error) {
      setProductos([]);
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, producto) => {
  console.log("Producto seleccionado desde menú:", producto);
  setSelectedProduct(producto);
  setAnchorEl(event.currentTarget);
};

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEliminar = () => {
    if (selectedProduct) {
      setConfirmOpen(true);
    } else {
      setSnackbar({ open: true, mensaje: 'No hay producto seleccionado', tipo: 'error' });
    }
    handleMenuClose();
  };

  const confirmarEliminacion = async () => {
    if (!selectedProduct || !selectedProduct.identificador_unico) {
      setSnackbar({ open: true, mensaje: 'Producto no válido para eliminar', tipo: 'error' });
      setConfirmOpen(false);
      return;
    }

    console.log("Eliminando producto con identificador:", selectedProduct.identificador_unico);

    try {
      await eliminarProductoPorIdentificador(selectedProduct.identificador_unico);
      setProductos((prev) =>
        prev.filter((p) => p.identificador_unico !== selectedProduct.identificador_unico)
      );
      setSnackbar({ open: true, mensaje: 'Producto eliminado correctamente', tipo: 'success' });
    } catch (err) {
      setSnackbar({ open: true, mensaje: err.message, tipo: 'error' });
    } finally {
      setConfirmOpen(false);
      setSelectedProduct(null); 
    }
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
          <MoreVertIcon sx={{ color: '#e91e63' }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Buscar Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Inventory2Icon />}
          onClick={() => navigate('/inventarios')}
          sx={{
            backgroundColor: '#e91e63',
            '&:hover': { backgroundColor: '#c2185b' },
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Inventario
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Nombre o código del producto"
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          sx={{
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleBuscar}
          disabled={loading}
          sx={{
            backgroundColor: '#e91e63',
            '&:hover': { backgroundColor: '#c2185b' },
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Buscar
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : mensaje ? (
        <Typography color="error">{mensaje}</Typography>
      ) : (
        <DataGrid
          rows={productos}
          columns={columnas}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id}
          localeText={localeText}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            '& .header-bold': { fontWeight: 'bold' },
          }}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem onClick={handleEliminar}>
          <ListItemIcon>
            <DeleteForeverIcon sx={{ color: '#e91e63' }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }}>
            Eliminar producto
          </ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: '#e91e63' }}>
          <WarningAmberIcon sx={{ mr: 1 }} />
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el producto <b>{selectedProduct?.nombre}</b>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={confirmarEliminacion}
            variant="contained"
            sx={{
              backgroundColor: '#e91e63',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#c2185b' }
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.tipo} sx={{ width: '100%' }}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductSearch;
