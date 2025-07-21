import axios from 'axios';

// Configuración global de axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  timeout: 15000  // Aumentado a 15 segundos para pruebas
});

// Interceptor para request
api.interceptors.request.use(
  config => {
    const logData = {
      method: config.method.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      headers: {
        ...config.headers,
        // No mostrar el token completo en logs por seguridad
        'Authorization': config.headers.Authorization ? 'Bearer [token]' : undefined
      }
    };
    
    console.log(`[API] ${logData.method} ${logData.url}`, logData);
    return config;
  },
  error => {
    console.error('[API] Error en la petición:', error);
    return Promise.reject({
      type: 'REQUEST_ERROR',
      message: 'Error al realizar la petición',
      originalError: error
    });
  }
);

// Interceptor para response
api.interceptors.response.use(
  response => {
    console.log(`[API] Respuesta ${response.status} de ${response.config.method.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  error => {
    const errorResponse = {
      type: 'API_ERROR',
      timestamp: new Date().toISOString(),
      config: {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        data: error.config?.data
      }
    };

    if (error.response) {
      // Error de respuesta del servidor (4xx, 5xx)
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
      errorResponse.headers = error.response.headers;
      
      console.error('[API] Error en la respuesta:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config.url,
        response: error.response.data
      });
    } else if (error.request) {
      // No se recibió respuesta
      errorResponse.type = 'NETWORK_ERROR';
      errorResponse.message = 'No se pudo conectar con el servidor';
      console.error('[API] No se recibió respuesta del servidor:', error.request);
    } else {
      // Error al configurar la petición
      errorResponse.type = 'SETUP_ERROR';
      errorResponse.message = error.message || 'Error al configurar la petición';
      console.error('[API] Error en configuración de la petición:', error.message);
    }

    return Promise.reject(errorResponse);
  }
);

/**
 * Obtiene todos los usuarios
 * @returns {Promise<Array>} Lista de usuarios
 */
export const obtenerUsuarios = async () => {
  try {
    console.log('[SERVICE] Obteniendo lista de usuarios...');
    const response = await api.get('/usuarios');
    console.log(`[SERVICE] Se obtuvieron ${response.data?.length || 0} usuarios`);
    return response.data || [];
  } catch (error) {
    console.error('[SERVICE] Error al obtener usuarios:', error);
    throw {
      ...error,
      operation: 'obtenerUsuarios',
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Crea un nuevo usuario
 * @param {Object} usuario - Datos del usuario a crear
 * @param {string} usuario.nombre - Nombre del usuario
 * @param {string} usuario.email - Email del usuario
 * @returns {Promise<Object>} Usuario creado
 */
export const crearUsuario = async (usuario) => {
  // Validación básica
  if (!usuario?.nombre || !usuario?.email) {
    const error = new Error('Nombre y email son campos requeridos');
    error.type = 'VALIDATION_ERROR';
    throw error;
  }

  try {
    console.log('[SERVICE] Creando nuevo usuario:', { ...usuario, password: '[PROTECTED]' });
    const response = await api.post('/usuarios', usuario);
    console.log('[SERVICE] Usuario creado exitosamente:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('[SERVICE] Error al crear usuario:', error);
    throw {
      ...error,
      operation: 'crearUsuario',
      timestamp: new Date().toISOString(),
      userData: { ...usuario, password: '[PROTECTED]' }
    };
  }
};

/**
 * Actualiza un usuario existente
 * @param {string|number} id - ID del usuario a actualizar
 * @param {Object} usuario - Datos actualizados del usuario
 * @returns {Promise<Object>} Usuario actualizado
 */
export const actualizarUsuario = async (id, usuario) => {
  if (!id) {
    const error = new Error('Se requiere un ID de usuario válido');
    error.type = 'VALIDATION_ERROR';
    throw error;
  }

  try {
    console.log(`[SERVICE] Actualizando usuario ID: ${id}`, { ...usuario, password: '[PROTECTED]' });
    const response = await api.put(`/usuarios/${id}`, usuario);
    console.log(`[SERVICE] Usuario ${id} actualizado exitosamente`);
    return response.data;
  } catch (error) {
    console.error(`[SERVICE] Error al actualizar usuario ${id}:`, error);
    throw {
      ...error,
      operation: 'actualizarUsuario',
      timestamp: new Date().toISOString(),
      userId: id,
      userData: { ...usuario, password: '[PROTECTED]' }
    };
  }
};

/**
 * Elimina un usuario
 * @param {string|number} id - ID del usuario a eliminar
 * @returns {Promise<void>}
 */
export const eliminarUsuario = async (id) => {
  if (!id) {
    const error = new Error('Se requiere un ID de usuario válido');
    error.type = 'VALIDATION_ERROR';
    throw error;
  }

  try {
    console.log(`[SERVICE] Eliminando usuario ID: ${id}`);
    await api.delete(`/usuarios/${id}`);
    console.log(`[SERVICE] Usuario ${id} eliminado exitosamente`);
  } catch (error) {
    console.error(`[SERVICE] Error al eliminar usuario ${id}:`, error);
    throw {
      ...error,
      operation: 'eliminarUsuario',
      timestamp: new Date().toISOString(),
      userId: id
    };
  }
};

/**
 * Obtiene un usuario por su ID
 * @param {string|number} id - ID del usuario a buscar
 * @returns {Promise<Object>} Usuario encontrado
 */
export const obtenerUsuarioPorId = async (id) => {
  if (!id) {
    const error = new Error('Se requiere un ID de usuario válido');
    error.type = 'VALIDATION_ERROR';
    throw error;
  }

  try {
    console.log(`[SERVICE] Obteniendo usuario ID: ${id}`);
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[SERVICE] Error al obtener usuario ${id}:`, error);
    throw {
      ...error,
      operation: 'obtenerUsuarioPorId',
      timestamp: new Date().toISOString(),
      userId: id
    };
  }
};