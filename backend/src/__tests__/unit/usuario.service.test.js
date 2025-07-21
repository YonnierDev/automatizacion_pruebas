const UsuarioService = require('../../services/usuario.service');
const Usuario = require('../../models/usuario.model');
const { crearUsuarioDePrueba, limpiarDatosPrueba } = require('../../tests/test-utils');

describe('UsuarioService', () => {
  // Limpiar datos antes de cada prueba
  beforeEach(() => {
    limpiarDatosPrueba();
  });

  // Limpiar datos después de cada prueba
  afterEach(() => {
    limpiarDatosPrueba();
  });

  describe('crear', () => {
    it('debe crear un nuevo usuario', async () => {
      const usuarioData = {
        nombre: 'Test User',
        email: 'test@example.com',
      };

      const usuario = await UsuarioService.crear(usuarioData);

      expect(usuario).toHaveProperty('id');
      expect(usuario.nombre).toBe(usuarioData.nombre);
      expect(usuario.email).toBe(usuarioData.email);
      expect(usuario).toHaveProperty('fecha_creacion');
      expect(usuario).toHaveProperty('fecha_actualizacion');
    });

    it('debe lanzar un error si el email ya existe', async () => {
      const usuarioData = {
        nombre: 'Test User',
        email: 'test@example.com',
      };

      // Crear un usuario primero
      await UsuarioService.crear(usuarioData);

      // Intentar crear otro usuario con el mismo email
      await expect(UsuarioService.crear(usuarioData)).rejects.toThrow('El email ya está en uso');
    });

    it('debe lanzar un error si falta el nombre', async () => {
      const usuarioData = {
        email: 'test@example.com',
      };

      await expect(UsuarioService.crear(usuarioData)).rejects.toThrow('Nombre y email son obligatorios');
    });

    it('debe lanzar un error si falta el email', async () => {
      const usuarioData = {
        nombre: 'Test User',
      };

      await expect(UsuarioService.crear(usuarioData)).rejects.toThrow('Nombre y email son obligatorios');
    });

    it('debe lanzar un error si el email tiene un formato inválido', async () => {
      const usuarioData = {
        nombre: 'Test User',
        email: 'email-invalido',
      };

      await expect(UsuarioService.crear(usuarioData)).rejects.toThrow('El formato del email no es válido');
    });
  });

  describe('obtenerPorId', () => {
    it('debe devolver un usuario existente', async () => {
      const usuarioCreado = await crearUsuarioDePrueba();
      const usuario = await UsuarioService.obtenerPorId(usuarioCreado.id);

      expect(usuario).not.toBeNull();
      expect(usuario.id).toBe(usuarioCreado.id);
      expect(usuario.nombre).toBe(usuarioCreado.nombre);
      expect(usuario.email).toBe(usuarioCreado.email);
    });

    it('debe lanzar un error si el usuario no existe', async () => {
      await expect(UsuarioService.obtenerPorId(999)).rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('obtenerTodos', () => {
    it('debe devolver una lista vacía cuando no hay usuarios', async () => {
      const usuarios = await UsuarioService.obtenerTodos();
      expect(usuarios).toHaveLength(0);
    });

    it('debe devolver todos los usuarios', async () => {
      // Crear varios usuarios de prueba
      await crearUsuarioDePrueba({ email: 'test1@example.com' });
      await crearUsuarioDePrueba({ email: 'test2@example.com' });

      const usuarios = await UsuarioService.obtenerTodos();
      expect(usuarios).toHaveLength(2);
      
      // Verificar que los usuarios tengan los campos esperados
      usuarios.forEach(usuario => {
        expect(usuario).toHaveProperty('id');
        expect(usuario).toHaveProperty('nombre');
        expect(usuario).toHaveProperty('email');
        expect(usuario).toHaveProperty('fecha_creacion');
        expect(usuario).toHaveProperty('fecha_actualizacion');
      });
    });
  });

  describe('actualizar', () => {
    it('debe actualizar un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      const nuevosDatos = { nombre: 'Nombre Actualizado' };

      const usuarioActualizado = await UsuarioService.actualizar(usuario.id, nuevosDatos);
      
      expect(usuarioActualizado.nombre).toBe(nuevosDatos.nombre);
      expect(usuarioActualizado.email).toBe(usuario.email); // El email no debería cambiar
      expect(usuarioActualizado.fecha_actualizacion).not.toBe(usuario.fecha_actualizacion);
    });

    it('debe actualizar el email si se proporciona uno nuevo', async () => {
      const usuario = await crearUsuarioDePrueba();
      const nuevosDatos = { email: 'nuevo@example.com' };

      const usuarioActualizado = await UsuarioService.actualizar(usuario.id, nuevosDatos);
      
      expect(usuarioActualizado.email).toBe(nuevosDatos.email);
      expect(usuarioActualizado.nombre).toBe(usuario.nombre);
    });

    it('debe lanzar un error si el usuario no existe', async () => {
      await expect(UsuarioService.actualizar(999, { nombre: 'Nuevo Nombre' }))
        .rejects.toThrow('Usuario no encontrado');
    });

    it('debe lanzar un error si el nuevo email ya está en uso', async () => {
      // Crear dos usuarios
      const usuario1 = await crearUsuarioDePrueba({ email: 'usuario1@example.com' });
      await crearUsuarioDePrueba({ email: 'usuario2@example.com' });

      // Intentar actualizar el email del primer usuario al email del segundo
      await expect(
        UsuarioService.actualizar(usuario1.id, { email: 'usuario2@example.com' })
      ).rejects.toThrow('El email ya está en uso');
    });
  });

  describe('eliminar', () => {
    it('debe eliminar un usuario existente', async () => {
      const usuario = await crearUsuarioDePrueba();
      
      const resultado = await UsuarioService.eliminar(usuario.id);
      
      expect(resultado).toHaveProperty('mensaje', 'Usuario eliminado correctamente');
      
      // Verificar que el usuario ya no existe
      await expect(UsuarioService.obtenerPorId(usuario.id)).rejects.toThrow('Usuario no encontrado');
    });

    it('debe lanzar un error si el usuario no existe', async () => {
      await expect(UsuarioService.eliminar(999)).rejects.toThrow('Usuario no encontrado');
    });
  });
});
