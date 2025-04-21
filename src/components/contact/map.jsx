// src/components/contact/Map.jsx
import React from 'react';

const Map = () => {
  return (
    <div className="map-iframe-wrapper" style={{ width: '100%', height: '400px', borderRadius: '10px', overflow: 'hidden' }}>
      <iframe
        title="My Location"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=27.775373890201152,85.37034156931604&hl=es;z=14&output=embed"
      ></iframe>
    </div>
  );
};

export default Map;
