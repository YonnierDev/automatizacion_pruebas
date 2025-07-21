import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const FormularioUsuario = ({ show, onHide, usuario, onSave }) => {
  const [formData, setFormData] = useState({ nombre: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (usuario) {
      setFormData(usuario);
    } else {
      setFormData({ nombre: "", email: "" });
    }
    setError("");
  }, [usuario, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Ingrese un email válido");
      return;
    }
    try {
      await onSave(formData);
      onHide();
    } catch (err) {
      setError("Error al guardar el usuario");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{usuario ? "Editar Usuario" : "Nuevo Usuario"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese el email"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {usuario ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioUsuario;
