module.exports = {
  // Entorno de prueba (Node.js)
  testEnvironment: 'node',
  
  // Patrones para encontrar archivos de prueba
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.spec.js'
  ],
  
  // Directorios que deben ser ignorados
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  
  // Configuración de cobertura
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/tests/**',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!index.js'
  ],
  coverageReporters: ['text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Configurar setup y limpieza
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  
  // Configuración para pruebas de integración
  testTimeout: 10000, // 10 segundos de timeout para pruebas
  
  // Mostrar logs de pruebas fallidas
  verbose: true
};
