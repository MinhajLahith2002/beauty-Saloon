import React, { useState, useEffect } from 'react';
import { useServiceContext } from '../../context/ServiceContext';
import './ServiceForm.css';

const ServiceForm = ({ onClose }) => {
  const { editService, fetchServices } = useServiceContext();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    if (editService) {
      setFormData({
        name: editService.name,
        description: editService.description,
        price: editService.price,
        duration: editService.duration, 
      });
    }
  }, [editService]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = 'http://localhost:8000/api/v1';
      const url = editService ? `${baseUrl}/service/${editService._id}` : `${baseUrl}/service`;
      const method = editService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!response.ok) throw new Error('Failed to save service');

      fetchServices();
      onClose();
    } catch (error) {
      console.log('Error saving service:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="service-form">
        <h3>{editService ? 'Edit Service' : 'New Service'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="string"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              {editService ? 'Update' : 'Create'} Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
