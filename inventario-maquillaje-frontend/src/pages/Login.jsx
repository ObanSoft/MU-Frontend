import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';

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
          backgroundImage: 'url("/images/logo.png")',
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
          background: '#fdeef4',
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
