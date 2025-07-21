const Usuario = require('../models/usuario.model');

/**
 * Datos de prueba para usuarios
 */
const usuarioMock = {
  nombre: 'Usuario de Prueba',
  email: 'test@example.com',
};

/**
 * Crea un usuario de prueba en memoria
 * @param {Object} datosAdicionales - Datos adicionales para el usuario
 * @returns {Promise<Object>} Usuario creado
 */
const crearUsuarioDePrueba = async (datosAdicionales = {}) => {
  const usuario = await Usuario.crear({
    ...usuarioMock,
    ...datosAdicionales,
  });
  return { ...usuario }; // Devolver una copia para evitar referencias
};

/**
 * Limpia los datos de prueba
 */
const limpiarDatosPrueba = () => {
  Usuario._limpiar();
};

/**
 * Configura el entorno de prueba
 */
const configurarPruebas = () => {
  // Configurar entorno de prueba si es necesario
  process.env.NODE_ENV = 'test';
  
  // Limpiar datos antes de cada suite de pruebas
  beforeAll(() => {
    limpiarDatosPrueba();
  });
  
  // Limpiar datos después de cada prueba
  afterEach(() => {
    limpiarDatosPrueba();
  });
};

module.exports = {
  usuarioMock,
  crearUsuarioDePrueba,
  limpiarDatosPrueba,
  configurarPruebas,
};
