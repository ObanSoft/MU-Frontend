import API from '../consumoApi'

export const obtenerMargenCombos = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/ventas/margenCombos`, {
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