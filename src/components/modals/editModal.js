import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import API_BASE_URL from "../../api_config";

const EditModal = ({ car, closeModal, categories }) => {
  const [editCar, setEditCar] = useState(car);

  useEffect(() => {
    setEditCar(car);
  }, [car]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleUpdateCar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/cars/${editCar._id}`, editCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={editCar.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.CategoryName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="color"
            value={editCar.color}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={editCar.model}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Make</Form.Label>
          <Form.Control
            type="text"
            name="make"
            value={editCar.make}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="registrationNo"
            value={editCar.registrationNo}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdateCar}>
          Update Car
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
