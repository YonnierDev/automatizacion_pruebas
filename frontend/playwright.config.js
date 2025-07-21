// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener el directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuración de Playwright para pruebas E2E.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directorio base para los tests
  testDir: './e2e/tests',
  
  // Tiempo máximo de espera para cada test (30 segundos)
  timeout: 30 * 1000,
  
  // Número máximo de reintentos para pruebas fallidas en CI
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers para ejecución en paralelo (reducido para evitar sobrecarga)
  workers: process.env.CI ? 1 : 3,
  
  // Reporter para resultados de pruebas
  reporter: [
    ['html', { outputFolder: 'test-results/html' }],
    ['list'],
    ['junit', { outputFile: 'test-results/junit/results.xml' }]
  ],
  
  // Configuración global para todos los tests
  use: {
    // URL base para navegación
    baseURL: 'http://localhost:5173',
    
    // Capturas de pantalla solo en fallos
    screenshot: 'only-on-failure',
    
    // Video solo en fallos
    video: 'on-first-retry',
    
    // Trazas de ejecución
    trace: 'retain-on-failure',
    
    // Tiempo de espera para acciones
    actionTimeout: 10000,
    
    // Tiempo de espera para navegación
    navigationTimeout: 30000,
  },
  
  // Configuración de proyectos para diferentes navegadores
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    // Descomentar para habilitar pruebas en WebKit
    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1280, height: 720 },
    //   },
    // },
  ],
  
  // Servidor web para desarrollo
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  
  // Configuración de expectativas
  expect: {
    // Tiempo de espera para aserciones
    timeout: 10000,
    
    // Umbral para comparaciones de imágenes
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
});
