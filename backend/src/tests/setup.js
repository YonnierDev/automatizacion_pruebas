// Configuración global para las pruebas con Jest
const { configurarPruebas, limpiarDatosPrueba } = require('./test-utils');

// Configurar el entorno de prueba
configurarPruebas();

// Configurar el entorno de prueba
process.env.NODE_ENV = 'test';

// Configurar el timeout para las pruebas
jest.setTimeout(10000); // 10 segundos

// Limpiar datos antes de cada prueba
beforeEach(() => {
  limpiarDatosPrueba();
});

// Limpiar datos después de cada prueba
afterEach(() => {
  limpiarDatosPrueba();
});

// Limpiar datos después de todas las pruebas
afterAll(() => {
  // Cualquier limpieza adicional que pueda ser necesaria
});
