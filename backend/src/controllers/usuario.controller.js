const UsuarioService = require('../services/usuario.service');

/**
 * Controlador para manejar las operaciones de usuarios
 */
const usuarioController = {
  /**
   * Obtiene todos los usuarios
   * @route GET /api/usuarios
   * @returns {Object} Lista de usuarios
   */
  obtenerTodos: async (req, res, next) => {
    try {
      const usuarios = await UsuarioService.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Obtiene un usuario por su ID
   * @route GET /api/usuarios/:id
   * @param {string} id - ID del usuario
   * @returns {Object} Usuario encontrado
   */
  obtenerPorId: async (req, res, next) => {
    try {
      const usuario = await UsuarioService.obtenerPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      // El servicio ya maneja el error 404
      next(error);
    }
  },

  /**
   * Crea un nuevo usuario
   * @route POST /api/usuarios
   * @param {Object} req.body - Datos del usuario a crear
   * @returns {Object} Usuario creado
   */
  crear: async (req, res, next) => {
    try {
      const nuevoUsuario = await UsuarioService.crear(req.body);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      // El servicio ya valida los datos
      next(error);
    }
  },

  /**
   * Actualiza un usuario existente
   * @route PUT /api/usuarios/:id
   * @param {string} id - ID del usuario a actualizar
   * @param {Object} req.body - Datos a actualizar
   * @returns {Object} Usuario actualizado
   */
  actualizar: async (req, res, next) => {
    try {
      const usuarioActualizado = await UsuarioService.actualizar(
        req.params.id,
        req.body
      );
      res.json(usuarioActualizado);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Elimina un usuario
   * @route DELETE /api/usuarios/:id
   * @param {string} id - ID del usuario a eliminar
   * @returns {Object} Mensaje de confirmación
   */
  eliminar: async (req, res, next) => {
    try {
      const resultado = await UsuarioService.eliminar(req.params.id);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = usuarioController;
