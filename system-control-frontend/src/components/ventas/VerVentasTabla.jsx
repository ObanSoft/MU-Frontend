import React, { useState } from 'react';
import { Box } from '@mui/material';
import AccionesVentas from './AccionesVentas';
import BuscadorVentas from './BuscadorVentas';
import MargenVentas from './MargenVentas';
import TablaVentas from './TablaVentas';
import RegistrarVentaModal from './RegistrarVentaModal';

import { useCargarVentas } from '../../hooks/ventas/usoCargarVentas';
import { useBusquedaVentas } from '../../hooks/ventas/usoBuscarVentas';
import { useExportarVentas } from '../../hooks/ventas/usoExportarVentas';

const VerVentasTabla = () => {
  const { 
    ventas, 
    setVentas, 
    margen, 
    loading, 
    mensaje, 
    cargarTodasLasVentas, 
    cargarMargen 
  } = useCargarVentas();

  const { 
    busqueda, 
    setBusqueda, 
    buscarVentas, 
    loadingBusqueda, 
    mensajeBusqueda 
  } = useBusquedaVentas();

  const { exportarExcel } = useExportarVentas();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ p: 4 }}>
      <AccionesVentas
        abrirModal={() => setModalOpen(true)}
        exportarExcel={exportarExcel}
      />

      <BuscadorVentas
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        buscarVentas={() => buscarVentas(busqueda, setVentas, cargarTodasLasVentas)} 
      />

      <MargenVentas margen={margen} />

      <TablaVentas
        ventas={ventas}
        loading={loading}
        loadingBusqueda={loadingBusqueda}
        mensaje={mensaje}
        mensajeBusqueda={mensajeBusqueda}
      />

      <RegistrarVentaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onVentaRegistrada={async () => {
          await cargarTodasLasVentas();
          await cargarMargen();
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default VerVentasTabla;
