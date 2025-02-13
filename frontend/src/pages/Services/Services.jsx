import React, { useEffect, useState } from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';
import { useServiceContext } from '../../context/context';

const Services = () => {

  const {services, fetchServices} = useServiceContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  },[])

  const handleBookNow = (service) => {
    navigate('/booking', {state: {service}})
  }

  return (
    <div className="services-page">
      <h1 className="page-title">Our Services</h1>
      
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-meta">
                <span>${service.price}</span>
                <span>{service.duration}</span>
              </div>
            </div>
            <button className="book-now" onClick={() => handleBookNow(service)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;