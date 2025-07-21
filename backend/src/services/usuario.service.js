const Usuario = require('../models/usuario.model');

class UsuarioService {
  /**
   * Obtiene todos los usuarios
   * @returns {Promise<Array>} Lista de usuarios
   */
  static async obtenerTodos() {
    try {
      return await Usuario.obtenerTodos();
    } catch (error) {
      console.error('Error en UsuarioService.obtenerTodos:', error);
      throw error; // Pasamos el error para que el controlador lo maneje
    }
  }

  /**
   * Obtiene un usuario por su ID
   * @param {number} id - ID del usuario a buscar
   * @returns {Promise<Object>} Usuario encontrado
   */
  static async obtenerPorId(id) {
    try {
      return await Usuario.obtenerPorId(id);
    } catch (error) {
      console.error(`Error en UsuarioService.obtenerPorId(${id}):`, error);
      throw error; // Pasamos el error para que el controlador lo maneje
    }
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} usuarioData - Datos del usuario a crear
   * @returns {Promise<Object>} Usuario creado
   */
  static async crear(usuarioData) {
    try {
      // Validaciones básicas
      if (!usuarioData.nombre || !usuarioData.email) {
        const error = new Error('Nombre y email son obligatorios');
        error.status = 400;
        throw error;
      }

      // Validar formato de email simple
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuarioData.email)) {
        const error = new Error('El formato del email no es válido');
        error.status = 400;
        throw error;
      }

      return await Usuario.crear(usuarioData);
    } catch (error) {
      console.error('Error en UsuarioService.crear:', error);
      throw error; // Pasamos el error para que el controlador lo maneje
    }
  }

  /**
   * Actualiza un usuario existente
   * @param {number} id - ID del usuario a actualizar
   * @param {Object} datosActualizados - Datos a actualizar
   * @returns {Promise<Object>} Usuario actualizado
   */
  static async actualizar(id, datosActualizados) {
    try {
      // Si se está actualizando el email, validar formato
      if (datosActualizados.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosActualizados.email)) {
        const error = new Error('El formato del email no es válido');
        error.status = 400;
        throw error;
      }

      return await Usuario.actualizar(id, datosActualizados);
    } catch (error) {
      console.error(`Error en UsuarioService.actualizar(${id}):`, error);
      throw error; // Pasamos el error para que el controlador lo maneje
    }
  }

  /**
   * Elimina un usuario
   * @param {number} id - ID del usuario a eliminar
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async eliminar(id) {
    try {
      await Usuario.eliminar(id);
      return { mensaje: 'Usuario eliminado correctamente' };
    } catch (error) {
      console.error(`Error en UsuarioService.eliminar(${id}):`, error);
      throw error; // Pasamos el error para que el controlador lo maneje
    }
  }

  /**
   * Método de utilidad para pruebas - Limpia todos los usuarios
   * @private
   */
  static _limpiar() {
    if (process.env.NODE_ENV === 'test') {
      Usuario._limpiar();
    }
  }
}

module.exports = UsuarioService;
