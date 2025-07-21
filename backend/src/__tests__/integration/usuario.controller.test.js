const request = require('supertest');
const { startServer } = require('../../../index');
const Usuario = require('../../models/usuario.model');
const { crearUsuarioDePrueba, limpiarDatosPrueba } = require('../../tests/test-utils');

describe('Controlador de Usuarios - Integración', () => {
  let app;
  let server;
  
  // Datos de prueba
  const usuarioData = {
    nombre: 'Usuario de Prueba',
    email: 'test@example.com',
  };

  // Iniciar el servidor antes de las pruebas
  beforeAll(async () => {
    const { app: appInstance, server: serverInstance } = await startServer();
    app = appInstance;
    server = serverInstance;
    // Configurar el entorno de prueba
    process.env.NODE_ENV = 'test';
  });

  // Limpiar datos después de cada prueba
  afterEach(() => {
    limpiarDatosPrueba();
  });

  // Cerrar el servidor después de las pruebas
  afterAll(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  describe('GET /api/usuarios', () => {
    it('debe devolver una lista vacía cuando no hay usuarios', async () => {
      const response = await request(app).get('/api/usuarios');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });

    it('debe devolver todos los usuarios', async () => {
      // Crear usuarios de prueba
      await crearUsuarioDePrueba({ email: 'test1@example.com' });
      await crearUsuarioDePrueba({ email: 'test2@example.com' });

      const response = await request(app).get('/api/usuarios');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      
      // Verificar la estructura de los usuarios devueltos
      response.body.forEach(usuario => {
        expect(usuario).toHaveProperty('id');
        expect(usuario).toHaveProperty('nombre');
        expect(usuario).toHaveProperty('email');
        expect(usuario).toHaveProperty('fecha_creacion');
        expect(usuario).toHaveProperty('fecha_actualizacion');
      });
    });
  });

  describe('GET /api/usuarios/:id', () => {
    it('debe devolver un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      
      const response = await request(app).get(`/api/usuarios/${usuario.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', usuario.id);
      expect(response.body).toHaveProperty('nombre', usuario.nombre);
      expect(response.body).toHaveProperty('email', usuario.email);
      expect(response.body).toHaveProperty('fecha_creacion');
      expect(response.body).toHaveProperty('fecha_actualizacion');
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const response = await request(app).get('/api/usuarios/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'Usuario no encontrado');
    });
  });

  describe('POST /api/usuarios', () => {
    it('debe crear un nuevo usuario', async () => {
      const response = await request(app)
        .post('/api/usuarios')
        .send(usuarioData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nombre).toBe(usuarioData.nombre);
      expect(response.body.email).toBe(usuarioData.email);
      expect(response.body).toHaveProperty('fecha_creacion');
      expect(response.body).toHaveProperty('fecha_actualizacion');
    });

    it('debe devolver 400 si faltan campos requeridos', async () => {
      const response = await request(app)
        .post('/api/usuarios')
        .send({ nombre: 'Sin email' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message');
    });

    it('debe devolver 400 si el email no es válido', async () => {
      const response = await request(app)
        .post('/api/usuarios')
        .send({ 
          nombre: 'Usuario Inválido',
          email: 'email-invalido'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'El formato del email no es válido');
    });

    it('debe devolver 400 si el email ya está en uso', async () => {
      // Crear un usuario primero
      await crearUsuarioDePrueba({ email: 'existente@example.com' });
      
      // Intentar crear otro usuario con el mismo email
      const response = await request(app)
        .post('/api/usuarios')
        .send({
          nombre: 'Usuario Existente',
          email: 'existente@example.com'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'El email ya está en uso');
    });
  });

  describe('PUT /api/usuarios/:id', () => {
    it('debe actualizar un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      const nuevosDatos = { nombre: 'Nombre Actualizado' };
      
      const response = await request(app)
        .put(`/api/usuarios/${usuario.id}`)
        .send(nuevosDatos);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', usuario.id);
      expect(response.body.nombre).toBe(nuevosDatos.nombre);
      expect(response.body.email).toBe(usuario.email);
      expect(response.body).toHaveProperty('fecha_actualizacion');
      // Verificar que la fecha de actualización sea diferente
      expect(response.body.fecha_actualizacion).not.toBe(usuario.fecha_actualizacion);
    });

    it('debe actualizar el email si se proporciona uno nuevo', async () => {
      const usuario = await crearUsuarioDePrueba();
      const nuevosDatos = { email: 'nuevo@example.com' };
      
      const response = await request(app)
        .put(`/api/usuarios/${usuario.id}`)
        .send(nuevosDatos);
      
      expect(response.status).toBe(200);
      expect(response.body.email).toBe(nuevosDatos.email);
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const response = await request(app)
        .put('/api/usuarios/999')
        .send({ nombre: 'No existe' });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'Usuario no encontrado');
    });

    it('debe devolver 400 si el nuevo email ya está en uso', async () => {
      // Crear dos usuarios
      const usuario1 = await crearUsuarioDePrueba({ email: 'usuario1@example.com' });
      await crearUsuarioDePrueba({ email: 'usuario2@example.com' });

      // Intentar actualizar el email del primer usuario al email del segundo
      const response = await request(app)
        .put(`/api/usuarios/${usuario1.id}`)
        .send({ email: 'usuario2@example.com' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'El email ya está en uso');
    });
  });

  describe('DELETE /api/usuarios/:id', () => {
    it('debe eliminar un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      
      const response = await request(app).delete(`/api/usuarios/${usuario.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensaje', 'Usuario eliminado correctamente');
      
      // Verificar que el usuario ya no existe
      const getResponse = await request(app).get(`/api/usuarios/${usuario.id}`);
      expect(getResponse.status).toBe(404);
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const response = await request(app).delete('/api/usuarios/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('message', 'Usuario no encontrado');
    });
  });

  describe('POST /api/usuarios', () => {
    it('debe crear un nuevo usuario', async () => {
      const response = await request(app)
        .post('/api/usuarios')
        .send(usuarioData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nombre).toBe(usuarioData.nombre);
      expect(response.body.email).toBe(usuarioData.email);
    });

    it('debe devolver 400 si faltan campos requeridos', async () => {
      const response = await request(app)
        .post('/api/usuarios')
        .send({ nombre: 'Sin email' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/usuarios/:id', () => {
    it('debe actualizar un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      const nuevosDatos = { nombre: 'Nombre Actualizado' };
      
      const response = await request(app)
        .put(`/api/usuarios/${usuario.id}`)
        .send(nuevosDatos);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', usuario.id);
      expect(response.body.nombre).toBe(nuevosDatos.nombre);
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const response = await request(app)
        .put('/api/usuarios/999')
        .send({ nombre: 'No existe' });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Usuario no encontrado');
    });
  });

  describe('DELETE /api/usuarios/:id', () => {
    it('debe eliminar un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      
      const response = await request(app).delete(`/api/usuarios/${usuario.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensaje', 'Usuario eliminado correctamente');
      
      // Verificar que el usuario ya no existe
      const usuarioEliminado = await Usuario.findByPk(usuario.id);
      expect(usuarioEliminado).toBeNull();
    });

    it('debe devolver 404 si el usuario no existe', async () => {
      const response = await request(app).delete('/api/usuarios/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Usuario no encontrado');
    });
  });
});
