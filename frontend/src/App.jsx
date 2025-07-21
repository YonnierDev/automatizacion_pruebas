import React, { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaUsuarios from './components/usuarios/ListaUsuarios';
import FormularioUsuario from './components/usuarios/FormularioUsuario';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from './services/usuarioService';

function App() {
  console.log('[APP] Iniciando componente App');
  
  const [usuarios, setUsuarios] = useState(() => {
    console.log('[APP] Inicializando estado de usuarios');
    return [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [error, setError] = useState('');
  
  // Efecto para depuración de cambios en el estado
  useEffect(() => {
    console.log('[APP] Estado actualizado:', {
      usuariosCount: usuarios.length,
      showForm,
      usuarioActual,
      error
    });
  });

  const cargarUsuarios = async () => {
    console.log('Iniciando carga de usuarios...');
    try {
      const data = await obtenerUsuarios();
      console.log('Usuarios cargados:', data);
      setUsuarios(data);
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al cargar los usuarios';
      setError(`Error: ${errorMessage}`);
      console.error('Error al cargar usuarios:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleGuardar = async (usuario) => {
    try {
      if (usuario.id) {
        await actualizarUsuario(usuario.id, usuario);
      } else {
        await crearUsuario(usuario);
      }
      await cargarUsuarios();
      return true;
    } catch (err) {
      setError('Error al guardar el usuario');
      console.error('Error:', err);
      throw err;
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await eliminarUsuario(id);
        await cargarUsuarios();
        setError('');
      } catch (err) {
        setError('Error al eliminar el usuario');
        console.error('Error:', err);
      }
    }
  };

  // Debug: Mostrar solo información esencial
  console.log('Usuarios a mostrar:', usuarios?.length || 0);

  // Renderizado condicional para depuración
  console.log('Renderizando App...');
  console.log('Estado de usuarios:', usuarios);
  
  // Si hay un error, mostrarlo claramente
  if (error) {
    console.error('Error en la aplicación:', error);
  }

  return (
    <div className="d-flex justify-content-center w-100">
      <Container className="mt-4" style={{ maxWidth: '900px' }}>
      <h1 className="mb-4 text-center">Gestión de Usuarios</h1>
      
      {/* Mensaje de depuración */}
      <div className="alert alert-info mb-3">
        <p>Estado de la aplicación:</p>
        <ul>
          <li>Usuarios cargados: {usuarios.length}</li>
          <li>Error: {error ? 'Sí' : 'No'}</li>
          <li>Mostrando formulario: {showForm ? 'Sí' : 'No'}</li>
        </ul>
      </div>
      
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Usuarios</h2>
        <Button 
          variant="primary" 
          onClick={() => {
            setUsuarioActual(null);
            setShowForm(true);
          }}
        >
          Nuevo Usuario
        </Button>
      </div>
      
      {/* Mensaje de depuración */}
      {usuarios && usuarios.length > 0 ? (
        <Alert variant="success">Se encontraron {usuarios.length} usuarios</Alert>
      ) : (
        <Alert variant="info">No hay usuarios para mostrar</Alert>
      )}

      <ListaUsuarios
        usuarios={usuarios}
        onEditar={(usuario) => {
          setUsuarioActual(usuario);
          setShowForm(true);
        }}
        onEliminar={handleEliminar}
      />

      <FormularioUsuario
        show={showForm}
        onHide={() => setShowForm(false)}
        usuario={usuarioActual}
        onSave={handleGuardar}
      />
      </Container>
    </div>
  );
}

export default App;
