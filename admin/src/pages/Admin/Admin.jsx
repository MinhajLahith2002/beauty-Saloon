import { useState, useEffect } from 'react';
import ServiceList from '../../components/ServiceList/ServiceList';
import BookingList from '../../components/BookingList/BookingList';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <button
            className={`nav-button ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button
            className={`nav-button ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {activeTab === 'services' && <ServiceList />}
        {activeTab === 'bookings' && <BookingList />}
      </div>
    </div>
  );
};

export default Admin;