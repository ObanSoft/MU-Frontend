import React from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const LoginFields = ({
  numeroId,
  setNumeroId,
  contrasena,
  setContrasena,
  handleSubmit,
  loading,
}) => (
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      backgroundColor: 'white',
      padding: 6,
      borderRadius: 2,
      boxShadow: 15,
    }}
  >
    <TextField
      label="Número de Identificación"
      type="text"
      variant="outlined"
      value={numeroId}
      onChange={(e) => setNumeroId(e.target.value)}
      required
      InputLabelProps={{
        sx: {
          fontWeight: 'bold',
          '&.Mui-focused': { color: '#172b3dff' },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': { borderColor: '#172b3dff' },
          '&.Mui-focused fieldset': { borderColor: '#172b3dff' },
        },
      }}
    />

    <TextField
      label="Contraseña"
      type="password"
      variant="outlined"
      value={contrasena}
      onChange={(e) => setContrasena(e.target.value)}
      required
      InputLabelProps={{
        sx: {
          fontWeight: 'bold',
          '&.Mui-focused': { color: '#172b3dff' },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#ccc' },
          '&:hover fieldset': { borderColor: '#172b3dff' },
          '&.Mui-focused fieldset': { borderColor: '#172b3dff' },
        },
      }}
    />

    <Button
      type="submit"
      variant="contained"
      endIcon={<SendIcon />}
      sx={{
        mt: 1,
        fontWeight: 'bold',
        backgroundColor: '#172b3dff',
        '&:hover': { backgroundColor: '#172b3dff' },
        transition: 'all 0.3s ease-in-out',
      }}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
    </Button>
  </Box>
);

export default LoginFields;
