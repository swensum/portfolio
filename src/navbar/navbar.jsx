import React, { useState, useEffect } from 'react';
import './navbar.scss';
import logos from '/images/logos.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({ activeSection = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when the page is refreshed or initially loaded
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this runs only once on mount

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleHomeClick = (e) => {
    // Always close mobile menu
    setIsMobileMenuOpen(false);

    // Prevent default anchor behavior
    e.preventDefault();

    // Scroll to top without refreshing the page
    window.scrollTo(0, 0);

    // Update the URL hash without triggering page reload
    if (window.location.hash !== '#home') {
      window.history.pushState(null, '', '#home');
    } else {
      // Force a page refresh when we're already at the home section
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a 
          href="#home" 
          className={`navbar-logo ${activeSection === 'home' ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          <img src={logos} alt="Logo" className="navbar-logo-img" />
          MyPortfolio
        </a>

        {/* Mobile Hamburger Button */}
        <button 
          className="navbar-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="navbar-item">
            <a 
              href="#home" 
              className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={handleHomeClick}
            >
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#about" 
              className={`navbar-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#service" 
              className={`navbar-link ${activeSection === 'service' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Service
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#portfolio" 
              className={`navbar-link ${activeSection === 'portfolio' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </a>
          </li>
          <li className="navbar-item">
            <a 
              href="#contact" 
              className={`navbar-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Contact Button - Hidden on mobile */}
        <a 
          href="#contact" 
          className={`join-button ${activeSection === 'contact' ? 'active' : ''} ${isMobileMenuOpen ? 'mobile-hidden' : ''}`}
        >
          Contact Me
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
