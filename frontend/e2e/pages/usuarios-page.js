import BasePage from './base-page.js';

/**
 * Página de lista de usuarios
 */
export default class UsuariosPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/usuarios';
    
    // Selectores
    this.selectors = {
      // Encabezado
      header: 'h1',
      
      // Tabla de usuarios
      tablaUsuarios: 'table',
      filasUsuarios: 'table tbody tr',
      celdaNombre: 'td:nth-child(2)',
      celdaEmail: 'td:nth-child(3)',
      
      // Botones de acción
      btnNuevoUsuario: 'button:has-text("Nuevo Usuario")',
      btnEditar: (email) => `tr:has-text("${email}") button:has-text("Editar")`,
      btnEliminar: (email) => `tr:has-text("${email}") button:has-text("Eliminar")`,
      btnConfirmarEliminar: 'button:has-text("Confirmar Eliminación")',
      
      // Mensajes
      mensajeExito: '.alert-success',
      mensajeError: '.alert-danger',
      
      // Indicadores de carga
      loadingIndicator: '.loading-indicator',
      
      // Formulario (compartido con edición)
      form: 'form',
      inputNombre: 'input[name="nombre"]',
      inputEmail: 'input[name="email"]',
      btnGuardar: 'button[type="submit"]',
      btnCancelar: 'button:has-text("Cancelar")',
      
      // Errores de validación
      errorNombre: '#nombre-error',
      errorEmail: '#email-error',
    };
  }

  // Navegación
  async navigate() {
    await super.navigateTo(this.url);
    await this.waitForPageLoad();
  }

  // Acciones del formulario
  async abrirFormularioNuevoUsuario() {
    await this.click(this.selectors.btnNuevoUsuario);
    await this.waitForElement(this.selectors.form);
  }

  async llenarFormulario(usuario) {
    if (usuario.nombre) {
      await this.type(this.selectors.inputNombre, usuario.nombre);
    }
    if (usuario.email) {
      await this.type(this.selectors.inputEmail, usuario.email);
    }
  }

  async guardarUsuario() {
    await this.click(this.selectors.btnGuardar);
    await this.waitForPageLoad();
  }

  async cancelarEdicion() {
    await this.click(this.selectors.btnCancelar);
    await this.waitForPageLoad();
  }

  // Acciones CRUD
  async crearUsuario(usuario) {
    await this.abrirFormularioNuevoUsuario();
    await this.llenarFormulario(usuario);
    await this.guardarUsuario();
  }

  async editarUsuario(email, nuevosDatos) {
    await this.click(this.selectors.btnEditar(email));
    await this.waitForElement(this.selectors.form);
    await this.llenarFormulario(nuevosDatos);
    await this.guardarUsuario();
  }

  async eliminarUsuario(email) {
    await this.click(this.selectors.btnEliminar(email));
    await this.waitForElement(this.selectors.btnConfirmarEliminar);
    await this.click(this.selectors.btnConfirmarEliminar);
    await this.waitForPageLoad();
  }

  // Consultas
  async obtenerUsuarios() {
    await this.waitForElement(this.selectors.tablaUsuarios);
    
    return this.page.$$eval(this.selectors.filasUsuarios, (rows) => 
      rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          id: cells[0]?.textContent?.trim(),
          nombre: cells[1]?.textContent?.trim(),
          email: cells[2]?.textContent?.trim(),
          acciones: cells[3]?.textContent?.trim()
        };
      })
    );
  }

  async buscarUsuarioPorEmail(email) {
    const usuarios = await this.obtenerUsuarios();
    return usuarios.find(u => u.email === email);
  }

  async obtenerMensajeExito() {
    await this.waitForElement(this.selectors.mensajeExito);
    return this.getText(this.selectors.mensajeExito);
  }

  async obtenerMensajeError() {
    await this.waitForElement(this.selectors.mensajeError);
    return this.getText(this.selectors.mensajeError);
  }

  // Utilidades
  async esperarCargaInicial() {
    await this.waitForElement(this.selectors.tablaUsuarios);
    await this.page.waitForSelector(this.selectors.loadingIndicator, { state: 'hidden' });
  }

  async tomarCaptura(nombre) {
    await this.takeScreenshot(`usuarios-${nombre}`);
  }
}
