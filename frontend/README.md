# Aplicación de Gestión de Usuarios

Aplicación web desarrollada con React y Vite para la gestión de usuarios, que incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Características

- Interfaz de usuario moderna y responsiva
- Operaciones CRUD completas para la gestión de usuarios
- Validación de formularios en el cliente
- Integración con una API RESTful
- Pruebas E2E automatizadas con Playwright

## Tecnologías Utilizadas

- **Frontend**:
  - React 19
  - Vite 7
  - React Bootstrap 5
  - Axios para peticiones HTTP
  - React Router para la navegación

- **Testing**:
  - Playwright para pruebas E2E
  - Módulos ES para todo el código

## Pruebas E2E con Playwright

Este proyecto incluye pruebas E2E automatizadas que cubren el flujo completo de gestión de usuarios:

### Características de las Pruebas E2E

- **Cobertura CRUD Completa**:
  - Creación de nuevos usuarios
  - Visualización de usuarios existentes
  - Actualización de usuarios
  - Eliminación de usuarios
  - Validación de formularios

- **Características Avanzadas**:
  - Page Object Model (POM) para mejor mantenimiento
  - Capturas de pantalla automáticas en fallos
  - Informes HTML detallados
  - Soporte para múltiples navegadores

### Ejecutando las Pruebas E2E

1. Asegúrate de que el servidor de desarrollo esté en ejecución:
   ```bash
   npm run dev
   ```

2. En otra terminal, ejecuta las pruebas E2E:
   ```bash
   # Ejecutar todas las pruebas
   npx playwright test
   
   # Ejecutar pruebas solo en Chrome
   npx playwright test --project=chromium
   
   # Ejecutar pruebas en modo UI (interactivo)
   npx playwright test --ui
   ```

3. Ver los informes de pruebas:
   ```bash
   # Abrir el último informe HTML
   npx playwright show-report
   ```

### Estructura de las Pruebas E2E

```
e2e/
  ├── fixtures/         # Datos de prueba
  │   └── test-data.js
  ├── pages/           # Page Objects
  │   ├── base-page.js
  │   └── usuarios-page.js
  └── tests/           # Especificaciones de pruebas
      └── usuarios-crud.spec.js
```

## Configuración del Proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   ```

## Estructura del Proyecto

```
src/
  ├── components/      # Componentes reutilizables
  │   └── usuarios/    # Componentes específicos de usuarios
  ├── services/        # Servicios y lógica de negocio
  │   └── usuarioService.js
  ├── App.jsx         # Componente raíz
  └── main.jsx        # Punto de entrada
```

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
