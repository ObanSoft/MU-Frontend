import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DownloadIcon from "@mui/icons-material/Download";

const ComboToolbar = ({ margen, onBuscar, onRegistrar, onExportar }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={onRegistrar}
          startIcon={<AddShoppingCartIcon />}
          sx={{ backgroundColor: "#172b3dff", fontWeight: "bold" }}
        >
          Registrar Combo
        </Button>

        <Button
          variant="contained"
          onClick={onExportar}
          startIcon={<DownloadIcon />}
          sx={{ backgroundColor: "#172b3dff", fontWeight: "bold" }}
        >
          Exportar
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Buscar combo por nombre o código"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onBuscar(busqueda)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: '#172b3dff' },
              '&.Mui-focused fieldset': { borderColor: '#172b3dff', borderWidth: 2 },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => onBuscar(busqueda)}
          startIcon={<SearchIcon />}
          sx={{ backgroundColor: "#172b3dff", fontWeight: "bold" }}
        >
          Buscar
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 2, textAlign: "center", backgroundColor: "#fff", border: "1px solid #172b3dff" }}>
        <Typography fontWeight="bold" color="#172b3dff">
          Margen total de combos: ${margen} COP
        </Typography>
      </Paper>
    </Box>
  );
};

export default ComboToolbar;
