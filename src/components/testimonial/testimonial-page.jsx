import React, { useState, useEffect } from 'react';
import './testimonial.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { databases } from '../../appwriteClient'; 
const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isTestVisible, setIsTestVisible] = useState(false);
    
  
    useEffect(() => {
      const handleScroll = () => {
        const testimonialSection = document.querySelector('.block-container');
        if (testimonialSection) {
          const rect = testimonialSection.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setIsTestVisible(true);
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

 ;
 useEffect(() => {
  const loadTestimonials = async () => {
    try {
      const response = await databases.listDocuments(
        '6805c74e00219c72cbe9',      
        '6805c76d000baedae0c6'  
      );
      setTestimonials(response.documents || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  // Load testimonials when the page mounts
  loadTestimonials();

  // Add event listener to reload testimonials when a new one is added
  const handleTestimonialAdded = () => {
    loadTestimonials();
  };

  window.addEventListener('testimonialAdded', handleTestimonialAdded);

  return () => {
    window.removeEventListener('testimonialAdded', handleTestimonialAdded);
  };
}, []); // Only run once when the component is mounted


  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, testimonials]);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  const extendedTestimonials = testimonials.length > 3
    ? [...testimonials, ...testimonials.slice(0, 3)]
    : [...testimonials];

  return (
    <div className="testimonials-page">
      <div className={`block-container ${isTestVisible ? 'fade-in' : ''}`}>
        <div className={`side-block left-block  ${isTestVisible ? 'fade-in' : ''}`}></div>
        <div className={`side-block right-block  ${isTestVisible ? 'fade-in' : ''}`}></div>

        <section className="testimonials-hero">
          <div className="testimonials-container">
            <h2 className={`testimonials-heading ${isTestVisible ? 'fade-in' : ''}`}>
              <span className="heading-testimonials">Client Testimonials</span>
              <span className="inline"></span>
            </h2>
            <p className={`subtitle ${isTestVisible ? 'fade-in' : ''}`}>What People Say About My Work</p>
          </div>
        </section>

        <section className={`testimonials-grid ${isTestVisible ? 'fade-in' : ''}`}>
          <div className="testimonials-wrapper">
            <div
              className="testimonials-slider"
              style={{
                transform: `translateX(-${currentIndex * (screenWidth <= 868 ? 100 : 100 / 3)}%)`,
                transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none'
              }}
              
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="testimonial-card">
                  <div className="testimonial-header">
                    <img
                      src={testimonial.image} // Use the image saved with the testimonial
                      alt={testimonial.name}
                      className="client-image"
                    />
                    <div className="client-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.email}</p>

                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <p>"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testimonials-navigation">
            <button className="nav-arrow left-arrow" onClick={goToPrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="dots-indicator">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button className="nav-arrow right-arrow" onClick={goToNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestimonialsPage;