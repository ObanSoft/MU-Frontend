import { Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const ResumenCards = ({ resumen }) => {
  if (!resumen) return null;

  const datos = [
    { label: "Productos En Inventario", value: resumen.total_en_inventario, color: "#4dd0e1" },
    { label: "Total De Inventario", value: `$${resumen.valor_total_inventario.toLocaleString()}`, color: "#ba68c8" },
    { label: "Total De Ventas", value: `$${resumen.total_ventas.toLocaleString()}`, color: "#ffb74d" },
    { label: "Ventas Individuales", value: resumen.individuales_vendidos, color: "#81c784" },
    { label: "Combos Vendidos", value: resumen.combos_vendidos, color: "#64b5f6" },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {datos.map((item, i) => (
        <Grid item xs={12} md={3} key={i}>
          <motion.div whileHover={{ scale: 1.05 }}>
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
  );
};
