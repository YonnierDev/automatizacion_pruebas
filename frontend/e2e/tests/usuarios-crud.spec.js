import { test, expect } from '@playwright/test';
import { testUser, invalidUser, getUpdatedUserData } from '../fixtures/test-data.js';
import UsuariosPage from '../pages/usuarios-page.js';

// Configuración global de las pruebas
test.describe.configure({ mode: 'serial' });

test.describe('CRUD de Usuarios', () => {
  let usuariosPage;
  let usuarioCreado;
  let testContext = {};

  // Configuración antes de todas las pruebas
  test.beforeAll(async ({ browser }) => {
    // Crear una nueva instancia del navegador para todas las pruebas
    const context = await browser.newContext({
      recordVideo: {
        dir: 'test-results/videos/',
        size: { width: 1280, height: 720 }
      },
      viewport: { width: 1280, height: 720 }
    });
    
    // Crear una nueva página
    const page = await context.newPage();
    
    // Inicializar la página de usuarios
    usuariosPage = new UsuariosPage(page);
    
    // Navegar a la página de usuarios
    await usuariosPage.navigate();
    await usuariosPage.esperarCargaInicial();
    
    // Guardar el contexto para limpieza posterior
    testContext.context = context;
  });

  // Limpieza después de todas las pruebas
  test.afterAll(async () => {
    if (testContext.context) {
      await testContext.context.close();
    }
  });

  // Prueba: Crear un nuevo usuario
  test('debería crear un nuevo usuario correctamente', async () => {
    // Tomar captura antes de la acción
    await usuariosPage.tomarCaptura('antes-de-crear-usuario');
    
    // Crear un usuario de prueba
    await usuariosPage.crearUsuario(testUser);
    
    // Verificar que se muestra el mensaje de éxito
    const mensajeExito = await usuariosPage.obtenerMensajeExito();
    expect(mensajeExito).toContain('éxito');
    
    // Verificar que el usuario aparece en la lista
    const usuarioEncontrado = await usuariosPage.buscarUsuarioPorEmail(testUser.email);
    expect(usuarioEncontrado).toBeTruthy();
    expect(usuarioEncontrado.nombre).toBe(testUser.nombre);
    
    // Guardar el usuario creado para pruebas posteriores
    usuarioCreado = { ...testUser, id: usuarioEncontrado.id };
    
    // Tomar captura después de la acción
    await usuariosPage.tomarCaptura('despues-de-crear-usuario');
  });

  // Prueba: Validar que no se puede crear un usuario con datos inválidos
  test('debería mostrar errores de validación con datos inválidos', async () => {
    // Tomar captura antes de la acción
    await usuariosPage.tomarCaptura('antes-de-validacion-invalida');
    
    // Intentar crear un usuario con datos inválidos
    await usuariosPage.abrirFormularioNuevoUsuario();
    await usuariosPage.llenarFormulario(invalidUser);
    
    // Verificar que se muestran los mensajes de error
    const mensajeErrorNombre = await usuariosPage.page.textContent(usuariosPage.selectors.errorNombre);
    const mensajeErrorEmail = await usuariosPage.page.textContent(usuariosPage.selectors.errorEmail);
    
    expect(mensajeErrorNombre).toContain('requerido');
    expect(mensajeErrorEmail).toContain('válido');
    
    // Tomar captura después de la acción
    await usuariosPage.tomarCaptura('despues-de-validacion-invalida');
    
    // Cancelar el formulario
    await usuariosPage.cancelarEdicion();
  });

  // Prueba: Leer un usuario existente
  test('debería mostrar los detalles de un usuario existente', async () => {
    // Verificar que el usuario creado previamente está en la lista
    const usuarioEncontrado = await usuariosPage.buscarUsuarioPorEmail(usuarioCreado.email);
    expect(usuarioEncontrado).toBeTruthy();
    expect(usuarioEncontrado.nombre).toBe(usuarioCreado.nombre);
    
    // Tomar captura de la lista de usuarios
    await usuariosPage.tomarCaptura('lista-usuarios');
  });

  // Prueba: Actualizar un usuario existente
  test('debería actualizar un usuario existente', async () => {
    // Datos actualizados
    const nuevosDatos = getUpdatedUserData(usuarioCreado.email);
    
    // Tomar captura antes de la actualización
    await usuariosPage.tomarCaptura('antes-de-actualizar-usuario');
    
    // Actualizar el usuario
    await usuariosPage.editarUsuario(usuarioCreado.email, nuevosDatos);
    
    // Verificar que se muestra el mensaje de éxito
    const mensajeExito = await usuariosPage.obtenerMensajeExito();
    expect(mensajeExito).toContain('actualizado');
    
    // Verificar que los datos se actualizaron
    const usuarioActualizado = await usuariosPage.buscarUsuarioPorEmail(usuarioCreado.email);
    expect(usuarioActualizado).toBeTruthy();
    expect(usuarioActualizado.nombre).toBe(nuevosDatos.nombre);
    
    // Actualizar el usuario en el contexto
    Object.assign(usuarioCreado, nuevosDatos);
    
    // Tomar captura después de la actualización
    await usuariosPage.tomarCaptura('despues-de-actualizar-usuario');
  });

  // Prueba: Eliminar un usuario
  test('debería eliminar un usuario existente', async () => {
    // Tomar captura antes de la eliminación
    await usuariosPage.tomarCaptura('antes-de-eliminar-usuario');
    
    // Eliminar el usuario
    await usuariosPage.eliminarUsuario(usuarioCreado.email);
    
    // Verificar que se muestra el mensaje de éxito
    const mensajeExito = await usuariosPage.obtenerMensajeExito();
    expect(mensajeExito).toContain('eliminado');
    
    // Verificar que el usuario ya no está en la lista
    const usuarioEliminado = await usuariosPage.buscarUsuarioPorEmail(usuarioCreado.email);
    expect(usuarioEliminado).toBeFalsy();
    
    // Tomar captura después de la eliminación
    await usuariosPage.tomarCaptura('despues-de-eliminar-usuario');
  });
});
