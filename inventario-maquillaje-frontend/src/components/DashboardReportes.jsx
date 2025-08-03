import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Fade
} from '@mui/material';
import {
  obtenerVentasPorMes,
  obtenerMargenPorProducto,
  obtenerTop5MasVendidos,
  obtenerResumenGeneral,
  obtenerDetalleProducto,
} from '../api/reportes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  LabelList
} from 'recharts';
import { motion } from 'framer-motion';

const colores = ['#f06292', '#ba68c8', '#4dd0e1', '#aed581', '#ffb74d'];

const DashboardReportes = () => {
  const [loading, setLoading] = useState(true);
  const [ventasMes, setVentasMes] = useState([]);
  const [ventasMesFiltrado, setVentasMesFiltrado] = useState([]);
  const [margenProductos, setMargenProductos] = useState([]);
  const [topVendidos, setTopVendidos] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [detalleProducto, setDetalleProducto] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [detalleFiltradoPorMes, setDetalleFiltradoPorMes] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [vm, mp, tv, rg] = await Promise.all([
          obtenerVentasPorMes(),
          obtenerMargenPorProducto(),
          obtenerTop5MasVendidos(),
          obtenerResumenGeneral(),
        ]);
        setVentasMes(Array.isArray(vm) ? vm : []);
        setVentasMesFiltrado(Array.isArray(vm) ? vm : []);
        setMargenProductos(Array.isArray(mp) ? mp : []);
        setTopVendidos(Array.isArray(tv) ? tv : []);
        setResumen(rg);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const manejarCambioProducto = async (e) => {
    const nombre = e.target.value;
    setProductoSeleccionado(nombre);
    try {
      const detalle = await obtenerDetalleProducto(nombre);
      setDetalleProducto(detalle);
      // Si hay un mes seleccionado, filtramos el detalle
      if (mesSeleccionado && detalle && detalle.ventas_por_mes) {
        const detalleMes = detalle.ventas_por_mes.find(v => v.mes === mesSeleccionado);
        setDetalleFiltradoPorMes(detalleMes || null);
      } else {
        setDetalleFiltradoPorMes(null);
      }
    } catch (err) {
      setError(err.message);
      setDetalleProducto(null);
      setDetalleFiltradoPorMes(null);
    }
  };

  const manejarCambioMes = (e) => {
    const mes = e.target.value;
    setMesSeleccionado(mes);
    const filtrado = ventasMes.filter((item) => item.mes === mes);
    setVentasMesFiltrado(mes ? filtrado : ventasMes);

    if (detalleProducto && detalleProducto.ventas_por_mes) {
      const detalleMes = detalleProducto.ventas_por_mes.find(v => v.mes === mes);
      setDetalleFiltradoPorMes(detalleMes || null);
    } else {
      setDetalleFiltradoPorMes(null);
    }
  };

  const obtenerMesesUnicos = () => {
    const meses = ventasMes.map((v) => v.mes);
    return [...new Set(meses)];
  };

  if (loading) return <CircularProgress sx={{ mt: 10 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Fade in>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#e91e63">
            Dashboard de Reportes
          </Typography>
        </motion.div>
      </Fade>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {resumen && (
          <Fade in timeout={800}>
            <Grid container spacing={2}>
              {[
                { label: 'Vendidos', value: resumen.total_productos_vendidos, color: '#f06292' },
                { label: 'En Inventario', value: resumen.total_en_inventario, color: '#4dd0e1' },
                { label: 'Valor Inventario', value: `$${resumen.valor_total_inventario.toLocaleString()}`, color: '#ba68c8' },
                { label: 'Total Ventas', value: `$${resumen.total_ventas.toLocaleString()}`, color: '#ffb74d' },
              ].map((item, i) => (
                <Grid item xs={12} md={3} key={i}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Card sx={{ borderLeft: `6px solid ${item.color}`, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">{item.label}</Typography>
                        <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Grid>

      <Fade in timeout={1000}>
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Buscar detalle por producto"
            select
            fullWidth
            value={productoSeleccionado}
            onChange={manejarCambioProducto}
            sx={{
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
          >
            {Array.isArray(margenProductos) && margenProductos.map((p, i) => (
              <MenuItem key={i} value={p.producto}>{p.producto}</MenuItem>
            ))}
          </TextField>

          {detalleProducto && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[{
                label: 'Vendidos',
                value: detalleProducto.vendidos,
              }, {
                label: 'En Inventario',
                value: detalleProducto.en_inventario,
              }, {
                label: 'Ganancia Total',
                value: `$${detalleProducto.ganancia.toLocaleString()}`,
                color: '#4caf50'
              }].map((item, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle2">{item.label}</Typography>
                        <Typography fontWeight="bold" color={item.color || 'textPrimary'}>{item.value}</Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Fade>

      <TextField
        select
        fullWidth
        label="Filtrar Ventas por Mes"
        value={mesSeleccionado}
        onChange={manejarCambioMes}
        sx={{
            '& label.Mui-focused': { color: '#e91e63' },
            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#e91e63' },
          }}
      >
        <MenuItem value="">Todos los meses</MenuItem>
        {obtenerMesesUnicos().map((mes, i) => (
          <MenuItem key={i} value={mes}>{mes}</MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          {
            title: 'Ventas por Mes',
            data: ventasMesFiltrado,
            dataKey: 'total_ventas',
            xKey: 'mes',
            fill: '#e91e63',
            timeout: 1200,
          },
          {
            title: 'Margen por Producto',
            data: margenProductos,
            dataKey: 'ganancia_total',
            xKey: 'producto',
            fill: '#4dd0e1',
            timeout: 1400,
          },
        ].map((chart, i) => (
          <Fade in timeout={chart.timeout} key={i}>
            <Card sx={{ borderRadius: 4, minHeight: 450 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{chart.title}</Typography>
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={chart.data} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={chart.xKey} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={chart.dataKey} fill={chart.fill}>
                      <LabelList dataKey={chart.dataKey} position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Fade>
        ))}

        <Fade in timeout={1600}>
          <Card sx={{ borderRadius: 4, minHeight: 450 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top 5 Más Vendidos</Typography>
              <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                  <Pie
                    data={topVendidos}
                    dataKey="cantidad_vendida"
                    nameKey="producto"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    label
                  >
                    {topVendidos.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={colores[i % colores.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Box>
  );
};

export default DashboardReportes;