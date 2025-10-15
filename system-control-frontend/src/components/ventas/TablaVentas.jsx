import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Alert } from '@mui/material';

const localeText = {
  noRowsLabel: 'No hay ventas registradas',
  footerTotalRows: 'Total de ventas:',
  paginationLabelRowsPerPage: 'Filas por página:',
};

const columnas = [
  { field: 'identificador_unico', headerName: 'Código', width: 150 },
  { field: 'nombre_producto', headerName: 'Producto', width: 200 },
  { field: 'precio', headerName: 'Precio (COP)', width: 130 },
  { field: 'fecha_venta', headerName: 'Fecha de venta', width: 180 },
  { field: 'vendido_por', headerName: 'Vendido por', width: 150 },
  { field: 'metodo_pago', headerName: 'Método de pago', width: 130 },
  { field: 'tipo_venta', headerName: 'Tipo de venta', width: 150 },
];

const TablaVentas = ({ ventas, loading, loadingBusqueda, mensaje, mensajeBusqueda }) => {
  if (loading || loadingBusqueda) return <CircularProgress />;
  if (mensaje || mensajeBusqueda) return <Alert severity="error">{mensaje || mensajeBusqueda}</Alert>;

  return (
    <DataGrid
      rows={ventas}
      getRowId={(row) => row.identificador_unico}
      columns={columnas}
      autoHeight
      pageSize={5}
      rowsPerPageOptions={[5, 10, 25]}
      localeText={localeText}
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#ffffff', fontWeight: 'bold' },
      }}
    />
  );
};

export default TablaVentas;
