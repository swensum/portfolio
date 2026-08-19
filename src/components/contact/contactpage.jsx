// src/pages/contact/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { getTestimonials, addTestimonial } from '../../firebase';
import Map from '../../components/contact/map';
import './contact.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [testimonials, setTestimonials] = useState([]);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const officeLocation = { lat: 40.7128, lng: -74.0060 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    loadTestimonials();

    const handleScroll = () => {
      const contactSection = document.querySelector('.contact-page');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsContactVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const handleTestimonialAdded = () => {
      loadTestimonials();
    };
    window.addEventListener('testimonialAdded', handleTestimonialAdded);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('testimonialAdded', handleTestimonialAdded);
    };
  }, []);

  const loadTestimonials = async () => {
    try {
      const testimonialsData = await getTestimonials();
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const images = [
      '/random/image1.jpg',
      '/random/image2.jpg',
      '/random/image3.jpg',
      '/random/image4.jpg',
      '/random/image5.jpg',
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const newTestimonial = {
      name: formData.name,
      email: formData.email,
      content: formData.message,
      rating: 5,
      image: randomImage,
    };

    try {
      await addTestimonial(newTestimonial);
      window.dispatchEvent(new Event('testimonialAdded'));
      await loadTestimonials();

      alert('Thank you! Your message has been added to testimonials.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-page ${isContactVisible ? 'fade-in' : ''}`}>
      <div className="contact-container">
        <div className="bottom-block bottom-left"></div>
        <div className="bottom-block bottom-right"></div>

        <div className="map-wrapper">
          <Map location={officeLocation} />
        </div>

        <section className="contact-section">
          <div className={`contact-header ${isContactVisible ? 'fade-in' : ''}`}>
            <h2>Don't be shy</h2>
            <h1>Drop Me a Line</h1>
          </div>

          <div className={`contact-content ${isContactVisible ? 'fade-in' : ''}`}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  aria-label="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  aria-label="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  aria-label="Your message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Message'}
              </button>
            </form>

            <div className={`contact-info ${isContactVisible ? 'fade-in' : ''}`}>
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h3>Address</h3>
                  <p>Budhanilkantha, Kathmandu</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>shresthaswen80@gmail.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhoneAlt />
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p>+977 9867862670</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;