import API from '../consumoApi'

export const crearVentaCombo = async (comboData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/ventas/crearVentaCombo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(comboData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al crear la venta combo");
    }

    return data;
  } catch (error) {
    console.error("Error en crearVentaCombo:", error.message);
    throw error;
  }
};