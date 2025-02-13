import { useState, useEffect } from 'react';
import './BookingList.css';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/booking/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update status: ${errorText}`);
      }

       // Update the local state
       setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      fetchBookings();
    } catch (error) {
      console.log("Error updating status:", error);

    }
  }

  return (
    <div className="booking-list">
      <h2>Manage Bookings</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Service</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time}</td>
              <td>{booking.service?.name}</td>
              <td>{booking.user?.name}</td>
              <td>
                <span className={`status ${booking.status}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                <button className='button' onClick={() => updateStatus(booking._id, 'confirmed')}>confirmed</button>
                <button className='button' onClick={() => updateStatus(booking._id, 'cancelled')}>cancelled</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;