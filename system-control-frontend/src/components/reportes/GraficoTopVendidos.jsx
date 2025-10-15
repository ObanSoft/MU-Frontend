import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Fade } from "@mui/material";

export const TopVendidosPie = ({ data, colors }) => (
  <Fade in timeout={1600}>
    <Card sx={{ borderRadius: 4, minHeight: 450 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Top 5 Más Vendidos</Typography>
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie data={data} dataKey="cantidad_vendida" nameKey="producto" cx="50%" cy="50%" outerRadius={130} label>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </Fade>
);
