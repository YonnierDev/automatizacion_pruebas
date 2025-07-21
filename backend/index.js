const express = require('express');
const cors = require('cors');
const { initDB, closeDB } = require('./src/config/database');
const usuarioRoutes = require('./src/routes/usuario.routes');

// Crear la aplicación Express
const app = express();

// Configuración de CORS simplificada
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Manejar solicitudes preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Usuarios',
    endpoints: {
      usuarios: {
        obtenerTodos: 'GET /api/usuarios',
        obtenerUno: 'GET /api/usuarios/:id',
        crear: 'POST /api/usuarios',
        actualizar: 'PUT /api/usuarios/:id',
        eliminar: 'DELETE /api/usuarios/:id'
      }
    }
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  
  // Formato de respuesta de error para coincidir con los tests
  const errorResponse = {
    error: status === 404 ? 'Usuario no encontrado' : message,
    message, // Mantener para compatibilidad
    status   // Mantener para compatibilidad
  };

  // Incluir stack solo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(status).json(errorResponse);
});

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Ruta no encontrada',
      status: 404
    }
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
let server;

const startServer = async () => {
  try {
    // Inicializar la base de datos en memoria
    await initDB();
    
    server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log('Modo:', process.env.NODE_ENV || 'development');
    });
    
    return { app, server };
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de cierre de la aplicación
const shutdown = async () => {
  console.log('\nRecibida señal de apagado. Cerrando servidor...');
  
  if (!server) {
    console.log('Servidor no está corriendo');
    process.exit(0);
  }
  
  // Cerrar el servidor
  server.close(async (err) => {
    if (err) {
      console.error('Error al cerrar el servidor:', err);
      process.exit(1);
    }
    
    // Cerrar la conexión a la base de datos (si es necesario)
    try {
      await closeDB();
      console.log('Servidor cerrado correctamente');
      process.exit(0);
    } catch (dbError) {
      console.error('Error al cerrar la base de datos:', dbError);
      process.exit(1);
    }
  });
};

// Manejadores de señales para un cierre limpio
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Si este archivo es el principal, iniciar el servidor
if (require.main === module) {
  startServer().catch(console.error);
}

module.exports = { app, startServer, shutdown };
