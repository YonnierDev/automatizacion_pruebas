/**
 * Datos de prueba para usuarios
 */

/**
 * Genera un correo electrónico único para pruebas
 * @returns {string} Correo electrónico único
 */
export const generateUniqueEmail = () => {
  const timestamp = new Date().getTime();
  return `testuser_${timestamp}@example.com`;
};

/**
 * Datos de un usuario de prueba
 * @type {import('../../src/services/usuarioService').Usuario}
 */
export const testUser = {
  nombre: 'Usuario de Prueba',
  email: generateUniqueEmail(),
  password: 'Test123!',
};

/**
 * Datos de un usuario con formato inválido
 * @type {import('../../src/services/usuarioService').Usuario}
 */
export const invalidUser = {
  nombre: '', // Nombre vacío
  email: 'correo-invalido', // Correo inválido
  password: '123', // Contraseña muy corta
};

/**
 * Datos de un usuario actualizado
 * @param {string} [email] - Correo opcional para el usuario actualizado
 * @returns {import('../../src/services/usuarioService').Usuario}
 */
export const getUpdatedUserData = (email) => ({
  nombre: 'Usuario Actualizado ' + Math.floor(Math.random() * 10000),
  email: email || `updated_${Date.now()}@example.com`,
  password: 'Updated123!',
});
