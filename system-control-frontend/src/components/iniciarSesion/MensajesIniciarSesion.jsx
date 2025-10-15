import React from 'react';
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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

const LoginModalFeedback = ({ modalOpen, setModalOpen, isSuccess, modalMessage }) => (
  <>
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
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
            px: 3,
          }}
        >
          {isSuccess ? (
            <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
          ) : (
            <HighlightOffIcon sx={{ fontSize: 80, color: '#f44336', mb: 2 }} />
          )}

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: isSuccess ? '#2e7d32' : '#c62828',
              mb: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {isSuccess ? 'Inicio Exitoso' : 'Error al Iniciar Sesión'}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: '#555',
              mb: 3,
              maxWidth: 300,
            }}
          >
            {modalMessage}
          </Typography>

          {!isSuccess && (
            <Button
              onClick={() => setModalOpen(false)}
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1,
                fontWeight: 'bold',
                backgroundColor: '#c62828',
                '&:hover': { backgroundColor: '#b71c1c' },
              }}
            >
              Cerrar
            </Button>
          )}
        </Box>
      </Fade>
    </Modal>

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

export default LoginModalFeedback;
