import React from "react";
import { Snackbar, Alert } from "@mui/material";

export const SnackbarFeedback = ({ snackbar, setSnackbar }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={5000}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert
      severity={snackbar.tipo}
      sx={{
        width: "100%",
        fontSize: "1rem",
        p: 2,
        minWidth: 350,
      }}
      variant="filled"
    >
      {snackbar.mensaje}
    </Alert>
  </Snackbar>
);
