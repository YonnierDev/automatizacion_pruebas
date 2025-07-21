import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const ListaUsuarios = ({ usuarios, onEditar, onEliminar }) => {
  console.log('[ListaUsuarios] Renderizando con datos:', {
    esArray: Array.isArray(usuarios),
    cantidad: usuarios?.length || 0,
    datos: usuarios
  });

  // Efecto para depurar cambios en las props
  useEffect(() => {
    console.log('[ListaUsuarios] Props actualizadas:', {
      usuarios: usuarios?.length || 0,
      tieneFuncionEditar: typeof onEditar === 'function',
      tieneFuncionEliminar: typeof onEliminar === 'function'
    });
  }, [usuarios, onEditar, onEliminar]);

  if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
    const mensajeError = !usuarios ? 'No se recibieron datos' : 
                        !Array.isArray(usuarios) ? 'Los datos no son un array' :
                        'El array de usuarios está vacío';
    
    console.error('[ListaUsuarios] No se pueden mostrar los usuarios:', mensajeError, usuarios);
    
    return (
      <div className="alert alert-warning">
        <h4>No se pueden mostrar los usuarios</h4>
        <p>Razón: {mensajeError}</p>
        <details>
          <summary>Ver detalles técnicos</summary>
          <pre className="mt-2 p-2 bg-light border rounded">
            {JSON.stringify({
              tipo: typeof usuarios,
              esArray: Array.isArray(usuarios),
              valor: usuarios
            }, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div className="w-100" style={{ maxWidth: '800px' }}>
      <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
            <td>
              <Button 
                variant="warning" 
                size="sm" 
                onClick={() => onEditar(usuario)} 
                className="me-2"
              >
                Editar
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                onClick={() => onEliminar(usuario.id)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      </Table>
    </div>
  );
};

export default ListaUsuarios;
