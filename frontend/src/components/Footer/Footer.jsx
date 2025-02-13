import React from 'react';
import { GiHairStrands } from 'react-icons/gi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="brand-info">
          <GiHairStrands className="logo-icon" />
          <h3>BeautySalon</h3>
        </div>
        <div className="contact-info">
          <p>123 Beauty Street</p>
          <p>contact@beautysalon.com</p>
          <p>(555) 123-4567</p>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} BeautySalon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;