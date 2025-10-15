import API from '../consumoApi'

export const obtenerResumenInventario = async () => {
  const token = localStorage.getItem('token');

  const [cantidadRes, totalRes] = await Promise.all([
    fetch(`${API}/productos/verCantidadProducto`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`${API}/productos/totalInventario`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  const cantidadData = await cantidadRes.json();
  const totalData = await totalRes.json();

  if (!cantidadRes.ok) throw new Error(cantidadData.mensaje || 'Error cargando cantidad');
  if (!totalRes.ok) throw new Error(totalData.mensaje || 'Error cargando total');

  return {
    total_tipos_producto: cantidadData.total_tipos_producto,
    productos: cantidadData.productos,
    total_inventario_COP: totalData.total_inventario_COP,
  };
};