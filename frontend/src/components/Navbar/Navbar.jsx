import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHairStrands } from 'react-icons/gi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <GiHairStrands /> BeautySalon
      </Link>
      
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/booking">Booking</Link>
      </div>

      <button 
        className="hamburger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </nav>
  );
};

export default Navbar;