import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './footer.scss';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skill', label: 'Skills' },
  { href: '#service', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#testimonial', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Was checking '.about-section' before — a leftover from a copy-paste
      // that meant the footer's own fade-in never actually tracked the
      // footer's position on screen.
      const footerSection = document.querySelector('.portfolio-footer');
      if (footerSection) {
        const rect = footerSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsFooterVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={`portfolio-footer ${isFooterVisible ? 'fade-in' : ''}`}>
      <div className="footer-main">
        <div className="footer-brand">
          <h3>Sumit Shrestha</h3>
          <p>Web &amp; app developer based in Kathmandu, Nepal — building products end to end.</p>

          <div className="footer-status">
            <span className="status-dot" />
            Available for freelance work
          </div>

          <div className="footer-social">
            <a href="https://github.com/swensum" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/swen-shrestha-a89041304/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.facebook.com/swenshrestha/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="YOUR_WHATSAPP_URL" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <ul className="footer-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul className="footer-contact">
            <li>Budhanilkantha, Kathmandu</li>
            <li>
              <a href="mailto:shresthaswen80@gmail.com">shresthaswen80@gmail.com</a>
            </li>
            <li>
              <a href="tel:+9779867862670">+977 9867862670</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sumit Shrestha. All rights reserved.</p>
        <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          Back to top
          <span className="back-to-top-arrow">↑</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;