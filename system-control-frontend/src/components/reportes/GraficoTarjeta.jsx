import { Card, CardContent, Typography } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from "recharts";
import { Fade } from "@mui/material";

export const ChartCard = ({ title, data, xKey, dataKey, fill, timeout }) => (
  <Fade in timeout={timeout}>
    <Card sx={{ borderRadius: 4, minHeight: 450 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data} barSize={50}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={fill}>
              <LabelList dataKey={dataKey} position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </Fade>
);
