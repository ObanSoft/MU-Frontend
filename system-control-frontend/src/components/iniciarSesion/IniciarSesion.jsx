import React from 'react';
import { useLogin } from '../../hooks/iniciarSesion/usoIniciarSesion';
import LoginFields from './CamposIniciarSesion';
import LoginModalFeedback from './MensajesIniciarSesion';

const LoginForm = () => {
  const {
    numeroId,
    setNumeroId,
    contrasena,
    setContrasena,
    modalOpen,
    setModalOpen,
    modalMessage,
    loading,
    isSuccess,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <LoginFields
        numeroId={numeroId}
        setNumeroId={setNumeroId}
        contrasena={contrasena}
        setContrasena={setContrasena}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <LoginModalFeedback
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        isSuccess={isSuccess}
        modalMessage={modalMessage}
      />
    </>
  );
};

export default LoginForm;
