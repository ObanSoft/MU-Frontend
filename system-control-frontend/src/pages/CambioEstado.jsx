import React, { useState } from "react";
import { Box } from "@mui/material";
import SidebarNav from "../components/Nabvar";
import { useCambioEstado } from "../hooks/cambiosEstado/usoCambiosEstado";
import { CambioEstadoForm } from "../components/cambioEstado/CambioEstadoFormulario";

const CambioEstadoPage = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  const {
    codigo,
    setCodigo,
    identificadorCombo,
    setIdentificadorCombo,
    snackbar,
    setSnackbar,
    handleCambioEstado,
    handleDisolverCombo,
  } = useCambioEstado();

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarNav open={openSidebar} toggleOpen={toggleSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          ml: openSidebar ? "200px" : "60px",
        }}
      >
        <CambioEstadoForm
          codigo={codigo}
          setCodigo={setCodigo}
          identificadorCombo={identificadorCombo}
          setIdentificadorCombo={setIdentificadorCombo}
          handleCambioEstado={handleCambioEstado}
          handleDisolverCombo={handleDisolverCombo}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
      </Box>
    </Box>
  );
};

export default CambioEstadoPage;
