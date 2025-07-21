# API REST CRUD con Node.js y Express

Este proyecto es una API REST simple que implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar usuarios. Está construido con Node.js, Express y utiliza una base de datos en memoria para facilitar las pruebas.

## Características

- Operaciones CRUD completas para usuarios
- Validación de datos en el servidor
- Manejo de errores centralizado
- Arquitectura MVC (Modelo-Vista-Controlador)
- Pruebas unitarias y de integración con Jest
- Cobertura de código

## Estructura del Proyecto

```
src/
├── config/           # Configuraciones
├── controllers/      # Controladores
├── models/           # Modelos de datos
├── routes/           # Rutas de la API
├── services/         # Lógica de negocio
└── tests/            # Utilidades de prueba
__tests__/
├── integration/      # Pruebas de integración
└── unit/             # Pruebas unitarias
```

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd pruebas_crud
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

El proyecto está configurado para funcionar con una base de datos en memoria. No se requiere configuración adicional para desarrollo o pruebas.

## Ejecutando el Servidor

Para iniciar el servidor en modo desarrollo con recarga automática:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Pruebas

El proyecto incluye pruebas unitarias y de integración. Para ejecutarlas:

```bash
# Todas las pruebas
npm test

# Solo pruebas unitarias
npm run test:unit

# Solo pruebas de integración
npm run test:integration

# Pruebas con cobertura de código
npm run test:coverage
```

### Cobertura de Código

El proyecto mantiene una alta cobertura de código. Puedes ver el informe de cobertura después de ejecutar las pruebas en:

```
coverage/lcov-report/index.html
```

## Estructura de la API

### Usuarios

- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario existente
- `DELETE /api/usuarios/:id` - Eliminar un usuario

## Uso

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. La API estará disponible en `http://localhost:3000/api`

## Documentación de la API

### Usuarios

- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario existente
- `DELETE /api/usuarios/:id` - Eliminar un usuario

## Pruebas

Consulta el archivo [PRUEBAS.md](PRUEBAS.md) para información detallada sobre cómo ejecutar las pruebas.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
