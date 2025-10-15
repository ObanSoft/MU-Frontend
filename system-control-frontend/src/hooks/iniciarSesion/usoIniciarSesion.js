import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../api/inicioSesion/iniciarSesion';

export const useLogin = () => {
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
      setModalMessage('¡Bienvenido a Systems-Control!');
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
        if (isSuccess) {
          setModalOpen(false);
          setTimeout(() => navigate('/home'), 300);
        } else {
          setModalOpen(false);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalOpen, isSuccess, navigate]);

  return {
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
  };
};
