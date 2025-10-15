import API from "../consumoApi";

export const loginUsuario = async (numero_identificacion, contrasena) => {
  const res = await fetch(`${API}/login/iniciarSesion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero_identificacion, contrasena }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al iniciar sesión");
  }

  return data.token;
};