import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  CircularProgress,
  Fade,
  Backdrop
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../api/auth';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(1)',
  width: '90%',
  maxWidth: 400,
  bgcolor: '#fff',
  borderRadius: 4,
  boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
  p: 4,
  textAlign: 'center',
  animation: 'fadeScaleIn 0.4s ease-in-out',
};

const LoginForm = () => {
  const [numeroId, setNumeroId] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setModalMessage('');
    setIsSuccess(false);

    try {
      const token = await loginUsuario(numeroId, contrasena);
      localStorage.setItem('token', token);
      setIsSuccess(true);
      setModalMessage('¡Bienvenido a SCP-LUXIMAKEUP!');
    } catch (err) {
      setIsSuccess(false);
      setModalMessage(err.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => {
        setModalOpen(false);
        if (isSuccess) navigate('/home');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [modalOpen, isSuccess, navigate]);

  return (
    <>
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
          variant="outlined"
          value={numeroId}
          onChange={(e) => setNumeroId(e.target.value)}
          required
          InputLabelProps={{
            sx: {
              fontWeight: 'bold',
              '&.Mui-focused': { color: '#e91e63' },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ccc' },
              '&:hover fieldset': { borderColor: '#e91e63' },
              '&.Mui-focused fieldset': { borderColor: '#e91e63' },
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
              '&.Mui-focused': { color: '#e91e63' },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ccc' },
              '&:hover fieldset': { borderColor: '#e91e63' },
              '&.Mui-focused fieldset': { borderColor: '#e91e63' },
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
            backgroundColor: '#e91e63',
            '&:hover': { backgroundColor: '#c2185b' },
            transition: 'all 0.3s ease-in-out',
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
        </Button>
      </Box>

      {/* MODAL */}
      <Modal
        open={modalOpen}
        onClose={() => !isSuccess && setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              ...modalStyle,
              background: isSuccess
                ? 'linear-gradient(135deg, #f0fdf4, #c8e6c9)'
                : 'linear-gradient(135deg, #fff0f0, #ffcdd2)',
              border: `2px solid ${isSuccess ? '#66bb6a' : '#ef5350'}`,
            }}
          >
            {isSuccess ? (
              <CheckCircleIcon sx={{ fontSize: 80, color: '#388e3c', mb: 1 }} />
            ) : (
              <HighlightOffIcon sx={{ fontSize: 80, color: '#d32f2f', mb: 1 }} />
            )}

            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: isSuccess ? '#2e7d32' : '#b71c1c',
                mb: 1,
              }}
            >
              {isSuccess ? '¡Inicio exitoso!' : '¡Ups! Algo salió mal'}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', color: '#333', mb: 3 }}
            >
              {modalMessage}
            </Typography>

            {!isSuccess && (
              <Button
                onClick={() => setModalOpen(false)}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  fontWeight: 'bold',
                  color: '#d32f2f',
                  borderColor: '#d32f2f',
                  '&:hover': {
                    backgroundColor: '#fdecea',
                    borderColor: '#c62828',
                  },
                }}
              >
                Cerrar
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Animación personalizada */}
      <style>
        {`
          @keyframes fadeScaleIn {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default LoginForm;
