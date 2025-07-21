// Este archivo se mantiene para compatibilidad con el código existente
// pero ya no maneja la conexión a una base de datos real

// Función para inicializar la base de datos (ahora es una operación en memoria)
const initDB = async () => {
  console.log('Base de datos en memoria inicializada');
  return {}; // Retornamos un objeto vacío ya que no necesitamos una conexión real
};

// Función para cerrar la conexión a la base de datos (no es necesaria en memoria)
const closeDB = async () => {
  console.log('Base de datos en memoria cerrada');
  return Promise.resolve();
};

module.exports = {
  initDB,
  closeDB,
};
