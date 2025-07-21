const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

// Rutas para usuarios
router.get('/', UsuarioController.obtenerTodos);
router.get('/:id', UsuarioController.obtenerPorId);
router.post('/', UsuarioController.crear);
router.put('/:id', UsuarioController.actualizar);
router.delete('/:id', UsuarioController.eliminar);

module.exports = router;
