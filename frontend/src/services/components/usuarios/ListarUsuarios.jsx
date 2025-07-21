import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ListaUsuarios = ({ usuarios, onEditar, onEliminar }) => {
  if (!usuarios || usuarios.length === 0) {
    return <p>No hay usuarios registrados</p>;
  }

  return (
    <Table striped bordered hover>
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
              <Button variant="warning" size="sm" onClick={() => onEditar(usuario)} className="me-2">
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={() => onEliminar(usuario.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListaUsuarios;