import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './footer.scss';

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
    
  
    useEffect(() => {
      const handleScroll = () => {
        const footerSection = document.querySelector('.about-section');
        if (footerSection) {
          const rect = footerSection.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setIsFooterVisible(true);
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <footer className={`portfolio-footer ${isFooterVisible ? 'fade-in' : ''}`}>
      <div className="footer-content">
        <div className="footer-social">
          <a href="https://github.com/swensum" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/swen-shrestha-a89041304/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.facebook.com/swenshrestha/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
        
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#service">Service</a>
          <a href="#testimonial">Testimonial</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Sumit Shrestha. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;