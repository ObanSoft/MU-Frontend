import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '../components/iniciarSesion/IniciarSesion';

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
      }}
    >
      {}
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url("/images/inicioSesion.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffffff',
        }}
      >
        {}
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            background:'white',
          }}
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
