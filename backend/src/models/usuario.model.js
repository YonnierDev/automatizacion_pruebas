// Datos en memoria
let usuarios = [];
let proximoId = 1;

class Usuario {
  constructor({ id, nombre, email }) {
    this.id = id || proximoId++;
    this.nombre = nombre;
    this.email = email;
    this.fecha_creacion = new Date();
    this.fecha_actualizacion = new Date();
  }

  // Guardar el usuario en memoria
  guardar() {
    const usuarioExistente = usuarios.find(u => u.id === this.id);
    if (usuarioExistente) {
      // Actualizar
      const index = usuarios.findIndex(u => u.id === this.id);
      this.fecha_actualizacion = new Date();
      usuarios[index] = this;
      return this;
    } else {
      // Crear nuevo
      this.id = this.id || proximoId++;
      this.fecha_creacion = new Date();
      this.fecha_actualizacion = new Date();
      usuarios.push(this);
      return this;
    }
  }

  // Métodos estáticos para operaciones CRUD
  static async obtenerTodos() {
    return [...usuarios];
  }

  static async obtenerPorId(id) {
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (!usuario) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }
    return { ...usuario }; // Devolver una copia para evitar modificar el original
  }

  // Alias para compatibilidad con los tests
  static async findByPk(id) {
    return this.obtenerPorId(id);
  }

  static async crear(datos) {
    // Validar email único
    const existe = usuarios.some(u => u.email === datos.email);
    if (existe) {
      const error = new Error('El email ya está en uso');
      error.status = 400;
      throw error;
    }

    const usuario = new Usuario(datos);
    return usuario.guardar();
  }

  static async actualizar(id, datos) {
    const usuario = await Usuario.obtenerPorId(id);
    
    // Validar email único si se está actualizando
    if (datos.email && datos.email !== usuario.email) {
      const existe = usuarios.some(u => u.email === datos.email);
      if (existe) {
        const error = new Error('El email ya está en uso');
        error.status = 400;
        throw error;
      }
    }

    // Actualizar datos
    Object.assign(usuario, datos);
    usuario.fecha_actualizacion = new Date();
    
    // Guardar cambios
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
      usuarios[index] = usuario;
    }
    
    return usuario;
  }

  static async eliminar(id) {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }
    
    // Eliminar el usuario y devolver el usuario eliminado
    const [usuarioEliminado] = usuarios.splice(index, 1);
    return usuarioEliminado;
  }

  // Método para limpiar los datos (útil para pruebas)
  static _limpiar() {
    usuarios = [];
    proximoId = 1;
  }
}

// Datos de ejemplo para desarrollo
if (process.env.NODE_ENV !== 'test') {
  new Usuario({ nombre: 'Juan Pérez', email: 'juan@ejemplo.com' }).guardar();
  new Usuario({ nombre: 'María García', email: 'maria@ejemplo.com' }).guardar();
}

module.exports = Usuario;
