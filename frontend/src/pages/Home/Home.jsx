import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const servicesData = [
  {
    title: 'Hair Styling',
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Professional haircuts, coloring, and modern styling techniques',
    
  },
  {
    title: 'Spa Treatment',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Relaxing facials and rejuvenating skin care treatments',
   
  },
  {
    title: 'Nail Art',
    image: 'https://unsplash.com/photos/perfect-colour-close-up-of-an-artificial-nail-being-put-to-the-hand-while-choosing-the-nail-colour-lhZjI55SaMY',
    description: 'Creative manicures and pedicures with premium products',
  
  }
];

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="home-container">
   
      <section className="hero-section">
        <div className="hero-content hidden">
          <h1>Experience Premium Beauty Services</h1>
          <p>Book your appointment today and look your best</p>
          <Link to="/booking" className="cta-button">Book Now</Link>
        </div>
      </section>

     
      <section className="featured-services">
        <h2 className="section-title hidden">Our Popular Services</h2>
        <div className="services-grid">
          {servicesData.map((service, index) => ( 
            <div key={index} className="service-card hidden">
              <div className="card-image">
                <img 
                src={service.image} 
                alt={service.title}
                loading='lazy' 
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to='/services' className="learn-more">Learn More →</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
