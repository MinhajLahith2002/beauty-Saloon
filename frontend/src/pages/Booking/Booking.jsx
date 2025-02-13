import React from 'react';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../../components/Loader/Loader';
import ErrorComponent from '../../components/Error/Error';
import ConfirmationModal from '../../components/ConfirmationModel/ConfirmationModal';

import './Booking.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {useServiceContext} from '../../context/context'

const Booking = () => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {services, fetchServices} = useServiceContext();

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(()=> {
    if (location.state && location.state.service) {
      setSelectedService(location.state.service._id);
    }
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedDate || !selectedTime || !selectedService) {
      setError('Please fill all fields');
      return;
    }

    setShowConfirmation(true);
  };

  const createBooking = async (bookingDetails) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }

      const responseData =  await response.json();
      console.log("Response Data:", responseData);
      return responseData;
    } catch (error) {
      console.log('Error creating booking:', error);
    }
  };

  const confirmBooking = async () => {
    console.log("Confirm booking called");
    setLoading(true);

    try {
      const bookingDetails = {
        user: {
          name: userName,
          phone: userPhone
        },
        date: selectedDate,
        time: selectedTime,
        service: selectedService,
        serviceId: selectedService
      };
      const response = await createBooking(bookingDetails);
      console.log("Booking successful"); 
      setShowConfirmation(false);

      navigate('/confirmation', {
        state: {
          service: services.find(service => service._id === selectedService)?.name,
          date: selectedDate.toDateString(),
          time: selectedTime,
          bookingId: response.bookingId 
        }
      });
    } catch (err) {
      console.log("Booking failed", err);
      setError('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="booking-container">
      <h1>Book Your Appointment</h1>
      
      {error && <ErrorComponent message={error} />}
      {loading && <Loader />}

      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Select Service:</label>
          <select 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Choose a service</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>{service.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="form-group">
          <label>Select Time:</label>
          <div className="time-slots">
            {timeSlots.map(time => (
              <button
                type="button"
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="book-button">
          Book Now
        </button>
      </form>

      {showConfirmation && (
        <ConfirmationModal
        onConfirm={confirmBooking}
        onCancel={() => setShowConfirmation(false)}
        service={services.find(service => service._id === selectedService)?.name}
        date={selectedDate?.toDateString()}
        time={selectedTime}
      />
      )}
    </div>
  );
};

export default Booking;