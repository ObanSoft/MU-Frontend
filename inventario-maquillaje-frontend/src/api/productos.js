const API = 'http://localhost:5000';

export const buscarProductosPorNombre = async (nombre) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/buscar?nombre=${encodeURIComponent(nombre)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.mensaje || 'Error al buscar productos');
  return data.productos;
};

export const obtenerTodosLosProductos = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/ver`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.mensaje || 'Error al cargar los productos');
  return data.productos;
};

export const consultarProductoPorIdentificador = async (identificador) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/consultar_producto/${encodeURIComponent(identificador)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'No se pudo consultar el producto');
  return data;
};

export const registrarProducto = async (nombre, precio_venta, precio_compra, cantidad = 1) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/registrar_producto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre, precio_venta, precio_compra, cantidad }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Error al registrar producto');
  return data;
};


export const eliminarProductoPorIdentificador = async (identificador) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/eliminar_producto/${encodeURIComponent(identificador)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.mensaje || 'No se pudo eliminar el producto');
  return data;
};

export const cambiarEstadoProducto = async (identificador) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}/productos/cambiar_estado/${encodeURIComponent(identificador)}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.mensaje || 'Error al cambiar estado del producto');
  return data;
};

