import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import { useReportesData } from "../../hooks/reportes/usoCargarDatos";
import { useFiltrosReportes } from "../../hooks/reportes/usoFiltrosReportes";
import { ResumenCards } from "./ResumenTarjeta";
import { ChartCard } from "./GraficoTarjeta";
import { TopVendidosPie } from "./GraficoTopVendidos";
import { DetalleProducto } from "./DetalleProducto";

const COLORS = [
  "#f06292",
  "#ba68c8",
  "#4dd0e1",
  "#aed581",
  "#ffb74d",
  "#81c784",
  "#64b5f6",
];

const DashboardReportes = () => {
  const {
    loading,
    error,
    ventasMes,
    margenProductos,
    topVendidos,
    resumen,
    detalleProducto,
    cargarDetalleProducto,
  } = useReportesData();

  const {
    productoSeleccionado,
    setProductoSeleccionado,
    mesSeleccionado,
    manejarCambioMes,
    obtenerMesesUnicos,
    ventasFiltradas,
  } = useFiltrosReportes(ventasMes, detalleProducto);

  if (loading) return <CircularProgress sx={{ mt: 10 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Fade in>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#172b3dff">
            Dashboard de Reportes
          </Typography>
        </motion.div>
      </Fade>

      {/* Tarjetas de resumen */}
      <ResumenCards resumen={resumen} />

      {/* Filtro de producto y detalle */}
      <Fade in timeout={1000}>
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Buscar detalle por producto"
            select
            fullWidth
            value={productoSeleccionado}
            onChange={async (e) => {
              const nombre = e.target.value;
              setProductoSeleccionado(nombre);
              await cargarDetalleProducto(nombre);
            }}
            sx={{
              "& label.Mui-focused": { color: "#172b3dff" },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#172b3dff",
              },
            }}
          >
            {margenProductos.map((p, i) => (
              <MenuItem key={i} value={p.producto}>
                {p.producto}
              </MenuItem>
            ))}
          </TextField>

          <DetalleProducto detalle={detalleProducto} />
        </Box>
      </Fade>

      <TextField
        select
        fullWidth
        label="Filtrar Ventas por Mes"
        value={mesSeleccionado}
        onChange={(e) => manejarCambioMes(e.target.value)}
        sx={{
          "& label.Mui-focused": { color: "#172b3dff" },
          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
            borderColor: "#172b3dff",
          },
        }}
      >
        <MenuItem value="">Todos los meses</MenuItem>
        {obtenerMesesUnicos().map((mes, i) => (
          <MenuItem key={i} value={mes}>
            {mes}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mt: 4 }}>
        <ChartCard
          title="Ventas por Mes"
          data={ventasFiltradas}
          dataKey="total_ventas"
          xKey="mes"
          fill="#172b3dff"
          timeout={1200}
        />
        <ChartCard
          title="Margen por Producto"
          data={margenProductos}
          dataKey="ganancia_total"
          xKey="producto"
          fill="#4dd0e1"
          timeout={1400}
        />
        <TopVendidosPie data={topVendidos} colors={COLORS} />
      </Box>
    </Box>
  );
};

export default DashboardReportes;
