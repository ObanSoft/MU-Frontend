import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export const ProductoEstadoForm = ({ codigo, setCodigo, handleCambioEstado }) => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={3} color="#172b3dff">
        Cambiar estado de producto
      </Typography>

      <Box sx={{ display: "flex", gap: 2, maxWidth: 500, mb: 4 }}>
        <TextField
          label="Código del producto"
          fullWidth
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          sx={{
            "& label.Mui-focused": { color: "#172b3dff" },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#172b3dff",
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AutorenewIcon />}
          onClick={handleCambioEstado}
          sx={{
            backgroundColor: "#172b3dff",
            "&:hover": { backgroundColor: "#172b3dff" },
            color: "white",
            fontWeight: "bold",
          }}
        >
          Cambiar estado
        </Button>
      </Box>
    </>
  );
};
