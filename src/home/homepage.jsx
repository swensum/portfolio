import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';

import NavBar from '../navbar/navbar';
import About from '../components/aboutpage/about';
import Skills from '../components/skillpage/skill';
import './homepage.scss';
import port from '/images/fb.jpg';
import ServicePage from '../components/service/servicepage';
import PortfolioPage from '../components/portfolio/portfoliopage';
import TestimonialsPage from '../components/testimonial/testimonial-page';
import ContactPage from '../components/contact/contactpage';
import Footer from '../components/footer/footerpage';



const LandingPage = () => {
  const skills = [
    "App Developer",
    "Web Developer",
    "Content Creator",
    "UI/UX Designer",
    "Freelancer"
  ];
  const [currentSkill, setCurrentSkill] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  // Set up refs for each section
  const setSectionRef = (section) => (el) => {
    sectionRefs.current[section] = el;
  };

  
  // Skill rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adjust this offset as needed
      const sections = ['home', 'about', 'skill', 'service', 'portfolio', 'testimonial', 'contact'];

      // Special case for home section (top of page)
      if (scrollPosition < 200) { // Adjust this threshold to match your header height
        setActiveSection('home');
        return;
      }

      // Check other sections
      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techLogos = [
    { name: "React", image: "/images/react.png", position: "top" },
    { name: "Flutter", image: "/images/flutter.png", position: "right" },
    { name: "Firebase", image: "/images/firebase.png", position: "left" },
    { name: "Android", image: "/images/android.png", position: "bottom" }
  ];

  return (
    <div className="landing-page">
      <NavBar activeSection={activeSection} />

      <div className="hero-content">
        <header className="hero-section">

          <p className="hello">Hello, I'm</p>
          <h1>Sumit Shrestha<span role="img" aria-label="waving hand">👋</span></h1>

          <div className="skills-container">
            <div className="dash-line"></div>
            <p className="changing-skill" key={currentSkill}>{skills[currentSkill]}</p>
          </div>
          <p className="tagline">I am a tech enthusiast from Nepal,and I'm very passionate and dedicated to my work.</p>
          <div className='buttons'>
            <a href="#contact" className="hello-button">
              Say Hello
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-arrow">
                <path d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z" fill="currentColor"></path>
                <path d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="#contact" className='work'>
              My Works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="work-arrow">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <p className="social">Follow me:
            <div className="social-icons">
              <a href="https://github.com/swensum" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/swen-shrestha-a89041304/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="social-icon" />
              </a>
              <a href="https://www.facebook.com/swenshrestha/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="social-icon" />
              </a>
              <a href="YOUR_WHATSAPP_URL" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="social-icon" />
              </a>
            </div>
          </p>
        </header>
        <div className="hero-image">
          
          {techLogos.map((logo, index) => (
            <img
              key={index}
              src={logo.image}
              alt={logo.name}
              className={`tech-logo ${logo.position}`}
            />
          ))}

          <img src={port} alt="Sumit Shrestha" className="hero-img" />
        </div>
      </div>

      <section id="about" ref={setSectionRef('about')}>
        <About />
      </section>

      <section id="skill" ref={setSectionRef('skill')}>
        <Skills />
      </section>

      <section id="service" ref={setSectionRef('service')}>
        <ServicePage />
      </section>

      <section id="portfolio" ref={setSectionRef('portfolio')}>
        <PortfolioPage />
      </section>

      <section id="testimonial" ref={setSectionRef('testimonial')}>
        <TestimonialsPage />
      </section>

      <section id="contact" ref={setSectionRef('contact')}>
        <ContactPage />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;