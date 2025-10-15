import API from '../consumoApi'

export const disolverCombo = async (identificador_combo) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/disolverCombo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ identificador_combo }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.mensaje || 'Error al disolver combo');
  return data;
};