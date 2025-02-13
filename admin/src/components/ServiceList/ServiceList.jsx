import React, { useState } from 'react';
import { useServiceContext } from '../../context/ServiceContext';
import ServiceForm from '../ServiceForm/ServiceForm';
import './ServiceList.css';

const ServiceList = () => {
  const { services, setEditService, handleDelete } = useServiceContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="service-list">
      <div className="header">
        <h2>Manage Services</h2>
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add New Service
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.name}</td>
              <td>${service.price}</td>
              <td>{service.duration}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditService(service);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(service._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ServiceForm
          onClose={() => {
            setShowForm(false);
            setEditService(null);
          }}
        />
      )}
    </div>
  );
};

export default ServiceList;
