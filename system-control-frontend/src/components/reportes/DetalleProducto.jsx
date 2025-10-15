import { Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const DetalleProducto = ({ detalle }) => {
  if (!detalle) return null;

  const datos = [
    { label: "Vendidos", value: detalle.vendidos },
    { label: "En Inventario", value: detalle.en_inventario },
    { label: "Ganancia Total", value: `$${detalle.ganancia.toLocaleString()}`, color: "#4caf50" },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {datos.map((item, i) => (
        <Grid item xs={12} md={4} key={i}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography fontWeight="bold" color={item.color || "textPrimary"}>{item.value}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};
