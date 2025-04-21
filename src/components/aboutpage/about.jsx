import React from 'react';
import './about.scss';
import port from '/images/port.jpg';

const About = () => {
  const handleViewCV = () => {
    // Open CV in a new tab for viewing
    window.open('/files/sumit new.pdf', '_blank');
    
    // Optional: Trigger download after a delay (comment out if not needed)
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/files/sumit new.pdf';
      link.download = 'Sumit-Shrestha-CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000); // 1-second delay
  };

  return (
    <div className="about-page">
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src={port} alt="Profile" />
          </div>
          <div className="about-content">
            <h2 className="heading">
              <span className="heading-text">About Me</span>
              <span className="inline-underline"></span>
            </h2>
            <p className="me">I'm a Developer</p>
            <h2 className="app">I Develop Application that <br />Help People</h2>
            <p className="detail">Hello there! I'm a web and App developer, and I'm very passionate and dedicated to my work. With 6 month experience as a web and app developer, I have acquired the skills and knowledge necessary to make your project a success. I enjoy every step of the developing process, from discussion and collaboration.</p>
            <button className="cv" onClick={handleViewCV}>
              Download CV
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cv-icon">
                <path d="M15.25 22.7502H9.25C3.82 22.7502 1.5 20.4302 1.5 15.0002V9.00024C1.5 3.57024 3.82 1.25024 9.25 1.25024H14.25C14.66 1.25024 15 1.59024 15 2.00024C15 2.41024 14.66 2.75024 14.25 2.75024H9.25C4.64 2.75024 3 4.39024 3 9.00024V15.0002C3 19.6102 4.64 21.2502 9.25 21.2502H15.25C19.86 21.2502 21.5 19.6102 21.5 15.0002V10.0002C21.5 9.59024 21.84 9.25024 22.25 9.25024C22.66 9.25024 23 9.59024 23 10.0002V15.0002C23 20.4302 20.68 22.7502 15.25 22.7502Z" fill="currentColor" />
                <path d="M22.25 10.7502H18.25C14.83 10.7502 13.5 9.42023 13.5 6.00023V2.00023C13.5 1.70023 13.68 1.42023 13.96 1.31023C14.24 1.19023 14.56 1.26023 14.78 1.47023L22.78 9.47023C22.99 9.68023 23.06 10.0102 22.94 10.2902C22.82 10.5702 22.55 10.7502 22.25 10.7502ZM15 3.81023V6.00023C15 8.58023 15.67 9.25023 18.25 9.25023H20.44L15 3.81023Z" fill="currentColor" />
                <path d="M13.25 13.7502H7.25C6.84 13.7502 6.5 13.4102 6.5 13.0002C6.5 12.5902 6.84 12.2502 7.25 12.2502H13.25C13.66 12.2502 14 12.5902 14 13.0002C14 13.4102 13.66 13.7502 13.25 13.7502Z" fill="currentColor" />
                <path d="M11.25 17.7502H7.25C6.84 17.7502 6.5 17.4102 6.5 17.0002C6.5 16.5902 6.84 16.2502 7.25 16.2502H11.25C11.66 16.2502 12 16.5902 12 17.0002C12 17.4102 11.66 17.7502 11.25 17.7502Z" fill="currentColor" />
              </svg>
            </button>
            <a href="#contact" className='hire'>
              Hire Me
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hire-arrow">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;