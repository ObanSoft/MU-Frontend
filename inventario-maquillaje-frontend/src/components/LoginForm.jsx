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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom'; 
import { loginUsuario } from '../api/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
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
      setModalMessage('Bienvenido, Adminitrador!');
    } catch (err) {
      setIsSuccess(false);
      setModalMessage(err.message);
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => {
        setModalOpen(false);
        if (isSuccess) {
          navigate('/home'); 
        }
      }, 3000);
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
          boxShadow: 15
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
              '&.Mui-focused': { color: '#e91e63' }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ccc' },
              '&:hover fieldset': { borderColor: '#e91e63' },
              '&.Mui-focused fieldset': { borderColor: '#e91e63' }
            }
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
              '&.Mui-focused': { color: '#e91e63' }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ccc' },
              '&:hover fieldset': { borderColor: '#e91e63' },
              '&.Mui-focused fieldset': { borderColor: '#e91e63' }
            }
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
            '&:hover': { backgroundColor: '#c2185b' }
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => !isSuccess && setModalOpen(false)} 
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)'
          }
        }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              ...style,
              borderLeft: `10px solid ${isSuccess ? '#4caf50' : '#f44336'}`,
              backgroundColor: isSuccess ? '#e8f5e9' : '#ffebee'
            }}
          >
            {isSuccess ? (
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#4caf50', mb: 1 }} />
            ) : (
              <ErrorOutlineIcon sx={{ fontSize: 60, color: '#f44336', mb: 1 }} />
            )}
            <Typography
              variant="h6"
              fontWeight="bold"
              color={isSuccess ? 'success.main' : 'error.main'}
              gutterBottom
            >
              {isSuccess ? '¡Éxito!' : 'Error'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {modalMessage}
            </Typography>

            {!isSuccess && (
              <Button
                onClick={() => setModalOpen(false)}
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: '#f44336',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#d32f2f' }
                }}
              >
                Cerrar
              </Button>
            )}
          </Box>
        </Fade>
      </Modal>

    </>
  );
};

export default LoginForm;
