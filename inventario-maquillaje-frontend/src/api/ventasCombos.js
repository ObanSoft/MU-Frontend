const API_URL = "http://localhost:5000";

export const crearVentaCombo = async (comboData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/ventas/crearVentaCombo`, {
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

export const obtenerMargenCombos = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/ventas/margen_combos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al obtener margen combos");
    }

    return data.total_combos_cop;
  } catch (error) {
    console.error("Error en obtenerMargenCombos:", error.message);
    throw error;
  }
};