// src/pages/testimonials/TestimonialsPage.jsx
import React, { useState, useEffect } from 'react';
import './testimonial.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { getTestimonials } from '../../firebase'; // Import from firebase.js

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isTestVisible, setIsTestVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle scroll animation
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load testimonials from Firebase
  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      try {
        const testimonialsData = await getTestimonials();
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();

    const handleTestimonialAdded = () => {
      loadTestimonials();
    };

    window.addEventListener('testimonialAdded', handleTestimonialAdded);

    return () => {
      window.removeEventListener('testimonialAdded', handleTestimonialAdded);
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, testimonials]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  const extendedTestimonials = testimonials.length > 3
    ? [...testimonials, ...testimonials.slice(0, 3)]
    : [...testimonials];

  if (loading) {
    return (
      <div className="testimonials-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="testimonials-page">
      <div className={`block-container ${isTestVisible ? 'fade-in' : ''}`}>
        
        <section className="testimonials-hero">
          <div className="testimonials-container">
            <p className={`eyebrow ${isTestVisible ? 'fade-in' : ''}`}>// Testimonials</p>

            <h2 className={`testimonials-heading ${isTestVisible ? 'fade-in' : ''}`}>
              <span className="heading-testimonials">Client Testimonials</span>
              <span className="inline"></span>
            </h2>
            <p className={`subtitle ${isTestVisible ? 'fade-in' : ''}`}>
              What people say about my work
            </p>
          </div>
        </section>

        <section className={`testimonials-grid ${isTestVisible ? 'fade-in' : ''}`}>
          {testimonials.length === 0 ? (
            <div className="no-testimonials">
              <p>No testimonials yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <>
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
                      <FontAwesomeIcon icon={faQuoteLeft} className="quote-mark" aria-hidden="true" />
                      <div className="testimonial-header">
                        <img
                          src={testimonial.image || '/default-avatar.jpg'}
                          alt={testimonial.name}
                          className="client-image"
                          onError={(e) => {
                            e.target.src = '/default-avatar.jpg';
                          }}
                        />
                        <div className="client-info">
                          <h3>{testimonial.name}</h3>
                          <p>{testimonial.email}</p>
                          <div className="rating">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
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
                <button type="button" className="nav-arrow left-arrow" onClick={goToPrev} aria-label="Previous">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="dots-indicator">
                  {testimonials.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button type="button" className="nav-arrow right-arrow" onClick={goToNext} aria-label="Next">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default TestimonialsPage;