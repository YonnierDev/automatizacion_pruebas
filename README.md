# Sistema de Gestión de Usuarios

Este proyecto es un sistema completo de gestión de usuarios que incluye un frontend en React con Vite y un backend en Node.js con Express. El sistema implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de usuarios, con un enfoque en la calidad del código a través de pruebas automatizadas.

## 📋 Descripción General

El proyecto está dividido en dos componentes principales:

1. **Frontend**: Aplicación web desarrollada con React 19 y Vite que proporciona una interfaz de usuario moderna y reactiva para interactuar con la API.

2. **Backend**: API RESTful desarrollada con Node.js y Express que maneja la lógica de negocio y la persistencia de datos.

## 🚀 Características Principales

### Frontend
- Interfaz de usuario moderna y responsiva con React Bootstrap
- Gestión completa de usuarios (CRUD)
- Validación de formularios en el cliente
- Integración con la API del backend
- Pruebas E2E automatizadas con Playwright

### Backend
- API RESTful con Express
- Operaciones CRUD completas para usuarios
- Validación de datos en el servidor
- Manejo de errores centralizado
- Arquitectura MVC (Modelo-Vista-Controlador)
- Pruebas unitarias y de integración con Jest

## 🧪 Estrategia de Pruebas

El proyecto implementa múltiples niveles de pruebas para garantizar la calidad del código:

### 1. Pruebas Unitarias (Backend)
- **Objetivo**: Probar unidades individuales de código de forma aislada.
- **Tecnología**: Jest
- **Cobertura**: Alta cobertura de código (>80%)
- **Ubicación**: `backend/__tests__/unit/`

### 2. Pruebas de Integración (Backend)
- **Objetivo**: Probar la interacción entre diferentes componentes del backend.
- **Tecnología**: Jest + Supertest
- **Cobertura**: Pruebas de rutas, controladores y servicios
- **Ubicación**: `backend/__tests__/integration/`

### 3. Pruebas E2E (Frontend + Backend)
- **Objetivo**: Probar el flujo completo de la aplicación desde la interfaz de usuario hasta la base de datos.
- **Tecnología**: Playwright
- **Características**:
  - Pruebas de interfaz de usuario
  - Pruebas de flujo de usuario completo
  - Capturas de pantalla automáticas en fallos
  - Soporte para múltiples navegadores
- **Ubicación**: `frontend/e2e/`

## 🛠️ Configuración del Entorno

### Requisitos Previos
- Node.js (v16 o superior)
- npm (v8 o superior)
- Navegador web moderno (Chrome, Firefox, Edge, etc.)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd pruebas_test
   ```

2. **Configurar el Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configurar el Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## 🚀 Ejecución

### Iniciar el Backend
```bash
cd backend
npm run dev
```

### Iniciar el Frontend (en otra terminal)
```bash
cd frontend
npm run dev
```

### Ejecutar Pruebas

#### Backend
```bash
# Todas las pruebas
cd backend
npm test

# Solo pruebas unitarias
npm run test:unit

# Solo pruebas de integración
npm run test:integration

# Pruebas con cobertura de código
npm run test:coverage
```

#### Frontend (Pruebas E2E)
```bash
cd frontend

# Ejecutar todas las pruebas E2E
npx playwright test

# Ejecutar pruebas solo en Chrome
npx playwright test --project=chromium

# Ver informe de pruebas
npx playwright show-report
```

## 📂 Estructura del Proyecto

```
pruebas_test/
├── backend/                 # API REST con Node.js y Express
│   ├── src/                # Código fuente del backend
│   │   ├── config/         # Configuraciones
│   │   ├── controllers/    # Controladores
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Rutas de la API
│   │   └── services/       # Lógica de negocio
│   ├── __tests__/          # Pruebas del backend
│   │   ├── integration/    # Pruebas de integración
│   │   └── unit/           # Pruebas unitarias
│   └── package.json        # Dependencias y scripts del backend
│
└── frontend/               # Aplicación React con Vite
    ├── public/             # Archivos estáticos
    ├── src/                # Código fuente del frontend
    │   ├── components/     # Componentes reutilizables
    │   ├── services/       # Servicios para consumir la API
    │   ├── App.jsx         # Componente raíz
    │   └── main.jsx        # Punto de entrada
    ├── e2e/                # Pruebas E2E con Playwright
    │   ├── fixtures/       # Datos de prueba
    │   ├── pages/          # Page Objects
    │   └── tests/          # Especificaciones de pruebas
    └── package.json        # Dependencias y scripts del frontend
```

## 📊 Cobertura de Pruebas

El proyecto mantiene una alta cobertura de pruebas para garantizar la calidad del código:

- **Backend**: Cobertura superior al 80% (ver informe en `backend/coverage/lcov-report/index.html`)
- **Frontend**: Pruebas E2E que cubren los flujos principales de la aplicación

## 📝 Documentación Adicional

- [Documentación del Backend](./backend/README.md)
- [Documentación del Frontend](./frontend/README.md)
- [Guía de Pruebas del Backend](./backend/PRUEBAS.md)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ como parte de un proyecto de prueba técnica.
