import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { certificates } from './constants';

const CertificatesModal = ({ setShowModal }) => {
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="certificates-modal">
      <div 
        className="modal-overlay" 
        onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) {
            setShowModal(false);
          }
        }}
      />
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        <button className="close-button" onClick={() => setShowModal(false)}>
          <FaTimes />
        </button>
        <h3>My Certificates</h3>
        <div className="certificates-grid">
          {certificates.map(cert => (
            <div key={cert.id} className="certificate-item">
            <div className="certificate-image-container">
                <img 
                  src={cert.image} 
                  alt={`${cert.title} certificate`}
                  className="certificate-image"
                />
              </div>
              <div className="certificate-info">
                <h4>{cert.title}</h4>
                <p>Issued by: {cert.issuer}</p>
                <span>Completed: {cert.date}</span>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificatesModal;