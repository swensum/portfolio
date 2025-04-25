import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './service.scss';

const ServicePage = () => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceVisible, setIsServiceVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const serviceSection = document.querySelector('.service-page');
      if (serviceSection) {
        const rect = serviceSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsServiceVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const services = [
    {
      id: 1,
      title: "UI/UX Design",
      description: "I design clean and easy-to-use interfaces that make websites and apps look good and work well...",
      details: {
        image: "/images/uiux.jpg",
        features: [
          "User Interface Design",
          "Responsive Design",
          "Wireframing & Prototyping",
          "Usability Testing"
        ],
      fulldescriptions:"I design clean and easy-to-use interfaces that make websites and apps look good and work well. From wireframing and prototyping to final design, I ensure every interaction is both functional and aesthetically pleasing. My goal is to help businesses create digital products that are not only beautiful but also provide a smooth, memorable user experience.",
      }
    },
    {
      id: 2,
      title: "APP DEVELOPING",
      description: "I build Android and IOS apps that are fast, user-friendly, and reliable. From planning to launch...", /*I make sure the app looksgood, works smoothly, and meets the needs of the users*/
      details: {
        image: "/images/app.jpg",
        features: [
          "Custom App Development",
          "Cross-Platform Compatibility",
          "User-Friendly Interfaces",
          "End-to-End Development"
        ],
        fulldescriptions:"I build Android and IOS apps that are fast, user-friendly, and reliable. From planning to launch,I make sure the app looksgood, works smoothly, and meets the needs of the users",
      }

    },
    {
      id: 3,
      title: "WEB DEVELOPING",
      description: "I create responsive and modern websites that work well on all devices. From front-end design ...",/*functionality, I focus on building websites that are fast, easy to use, and tailored to your needs...",*/
      details: {
        image: "/images/react.jpg",
        features: [
          "Responsive Web Design",
          "Custom Web Solutions",
          "Performance Optimization",
          "SEO-Friendly Development"
        ],
      fulldescriptions: "I create responsive and modern websites that work well on all devices. From front-end design functionality, I focus on building websites that are fast, easy to use, and tailored to your needs.",
      }
    },
    {
      id: 4,
      title: "Database Management",
      description: "I design and manage databases that store and organize data efficiently. Whether it’s for a website...",/* or an app, I make sure the data is secure, well-structured, and easy to access when needed.",*/
      details: {
        image: "/images/database.jpg",
        features: [
          "Data Organization & Structure",
          "Data Security",
          "Performance Optimization",
          "Backup & Recovery Solutions"
        ],
        fulldescriptions: "I design and manage databases that store and organize data efficiently. Whether it’s for a website or an app, I make sure the data is secure, well-structured, and easy to access when needed.",
      }
    }
  ];
  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <div className={`service-page ${isServiceVisible ? 'fade-in' : ''}`}>
      <section className="service-hero">
        <div className="service-container">
          <h1 className={`service-heading ${isServiceVisible ? 'fade-in' : ''}`}>
            <span className="service-text">
              Services <br />
              <span className="service-line">I Provide<span className="service-underline"></span></span>
            </span>
          </h1>
        </div>
      </section>

      <section className={`services-list-container ${isServiceVisible ? 'fade-in' : ''}`} onMouseLeave={() => setHoverIndex(0)}>
  <div 
    className="services-list"
    style={{ '--highlight-index': hoverIndex }}
  >
    {services.map((service, index) => (
     <div
     key={service.id}
     className={`service-content ${hoverIndex === index ? 'highlighted' : ''}`}
     onMouseEnter={() => setHoverIndex(index)}
     onClick={() => openServiceModal(service)}
     
   >
        <h1 className="service-number">0{service.id}</h1>
        <div className="service-item">
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>
{selectedService && (
        <div className="service-modal">
          <div className="modal-overlay" onClick={closeServiceModal} />
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeServiceModal}>
              <FaTimes />
            </button>
            <div className="service-detail">
              <div className="service-image-container">
                <img 
                  src={selectedService.details.image} 
                  alt={selectedService.title}
                  className="service-image"
                />
              </div>
              <div className="service-info">
                <h3>{selectedService.title}</h3>

               
            <div className="service-full-description">
              <p>{selectedService.details.fulldescriptions}</p>
            </div>
                
                <div className="service-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {selectedService.details.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
               </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default ServicePage;