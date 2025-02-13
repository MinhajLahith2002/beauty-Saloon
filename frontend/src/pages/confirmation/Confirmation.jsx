import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const {service, date, time, bookingId} = location.state || {};
  
  // const bookingDetails = {
  //   service: 'Haircut & Styling',
  //   date: 'October 15, 2023',
  //   time: '10:00 AM',
  //   bookingId: 'SALON12345'
  // };

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <FaCheckCircle className="success-icon" />
        <h2>Booking Confirmed!</h2>
        
        <div className="booking-details">
          <p><strong>Service:</strong> {service}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Booking ID:</strong> {bookingId}</p>
        </div>

        <p className="confirmation-text">
          We've sent a confirmation email to your registered address.
          Please arrive 10 minutes before your appointment.
        </p>

        <div className="action-buttons">
          <Link to="/" className="home-button">Back to Home</Link>
          <Link to="/booking" className="new-booking">Book Another Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;