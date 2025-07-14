import React, { useState , useEffect } from 'react';
import './portfolio.scss';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories = ['All', 'Web', 'Mobile', 'Design'];
  const [isPortVisible, setIsPortVisible] = useState(false);
    
  
    useEffect(() => {
      const handleScroll = () => {
        const portfolioSection = document.querySelector('.portfolio-page');
        if (portfolioSection) {
          const rect = portfolioSection.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setIsPortVisible(true);
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  const portfolioItems = [
    {
      id: 1,
      title: 'Restaurant Mobile Application',
      category: 'Mobile',
      image: '/images/portfolio/mobile.jpg',
      video: '/videos/mobile.mp4', 
      width: 'tall',
      description: 'I have developed a modern and user-friendly restaurant Android application using Flutter Framework . where i have:',
      points: [
        'Built client-side app for customers to browse menu, place orders, and view order history in real-time.',
        'Created admin dashboard for restaurant staff to manage orders, update menu items, and send push notifications.',
        'Integrated Google Maps API to enable location-based services map directions, user locations etc.',
        'Implemented real-time push notifications on order status updates.',
        'Focused on responsive UI/UX using Flutters flexible widget system for a smooth experience on various Android devices.'
      ],
      technologies: ['Flutter', 'Dart', 'Supabase','Firebase PUSH Notification','Google Map API', 'VS Code'],
      date: ' January 2025'
    },
   
    {
      id: 2,
      title: 'A health monitoring app ',
      category: 'Mobile',
      image: '/images/portfolio/health.jpg',
      video: '/videos/health.mp4', 
      width: 'tall',
      description: ' I have Developed a comprehensive health monitoring Android app.',
      points: [
        'Implemented a real-time step counter using the Android Sensor API, enabling users to track their daily physical activity.',
        'Designed and integrated a BMI calculator, allowing users to input height and weight and get personalized results.',
        'Built a diet monitoring and suggestion module, offering tailored food recommendations based on BMI and user goals (e.g., weight loss, gain, or maintenance).',
        'Implemented real-time push notifications on order status updates.',
      ],
      technologies: ['Java', 'XML', 'Kotlin','Android Studio'],
      client: 'Tech Solutions Inc.',
      date: 'November 2022'
    },
    {
      id: 3,
      title: 'To-do Mobile application ',
      category: 'Mobile',
      image: '/images/portfolio/todo.jpeg',
      video: '/videos/todo.mp4', 
      width: 'tall',
      description: 'I have Created a simple and efficient To-Do application.',
      points: [
        'Built clean and intuitive UI usinyg Flutter to allow users to add, edit, delete, and categorize tasks efficientl.',
        'Integrated SQLite for lightweight, offline-first local database to persist task data across sessions.',
        'Implemented Flutter Local Notifications to remind users of scheduled tasks and dailgoals.',
        'Enabled users to set due dates, mark tasks as complete, and filter views based on task status or priority.',
        'Implemented the charts to visualize task completion rates, daily/weekly productivity, and category distribution.'
      ],
      technologies: ['flutter', 'Dart','SQLite', 'VS code '],
      client: 'Creative Network',
      date: 'May 2022'
    },
    {
      id: 4,
      title: 'Education consultancy Website',
      category: 'Web',
      image: '/images/portfolio/felix.png',
      video: '/videos/Untitled1.mov', 
      width: 'square',
      description: 'I have Developed the frontend of an education consultancy website.',
      points: [
        'Built fast performance and modular component-based architecture.',
        'Created reusable components such as navbars, service cards, testimonial sliders, and contact forms.',
        'Integrated smooth scroll, hover animations, and interactive elements for engaging user experience.',
      ],
      technologies: ['React', 'SASS', 'React Router DOM'],
      client: 'National Bank',
      date: 'January 2023'
    },
    {
      id: 5,
      title: 'Soltech(A Web Application)',
      category: 'Web',
      image: '/images/portfolio/soltech.jpg',
      width: 'square',
      video: '/videos/Untitled.mov', 
      description: 'I Designed the frontend of a web application using React and Vite.',
      points: [
        'Built fast performance and modular component-based architecture.',
        'Built a dynamic UI builder interface, allowing users to easily create and customize their own eCommerce websites without writing code.',
        'Developed reusable React components for core features like product cards, banners, carousels, and customizable layouts.',
      ],
      technologies: ['React', 'Vite', 'VS code'],
      client: 'Startup Ventures',
      date: 'July 2022'
    },
    {
      id: 6,
      title: 'Yet To Be Come ',
      category: 'Design',
      image: '/images/portfolio/download.jpeg',
      width: 'square',
      description: 'Yet to be come.',
      technologies: ['null', 'null', 'null'],
      client: 'HealthFit',
      date: 'September 2022'
    },
  ];

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className={`portfolio-page ${isPortVisible ? 'fade-in' : ''}`}>
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <h2 className={`port-heading ${isPortVisible ? 'fade-in' : ''}`}>
            <span className="heading-port">My Portfolio</span>
            <span className="inline"></span>
          </h2>
        </div>
        <div className="port-word">
          <p className={`my ${isPortVisible ? 'fade-in' : ''}`}>My Amazing Works</p>
          <p className={`defination ${isPortVisible ? 'fade-in' : ''}`}>Most common methods for designing websites that work well on desktop is responsive and adaptive design</p>
        </div>
      </section>

      <section className="portfolio-categories">
        <div className="categories-container">
          <ul className="category-list">
            {categories.map((category) => (
              <li 
                key={category}
                className={`category-item ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`portfolio-grid ${isPortVisible ? 'fade-in' : ''}`}>
        <div className="grid-container">
          {filteredItems.map((item) => (
            <div key={item.id} className={`portfolio-item ${item.width}`}>
              <div className="item-image">
                <img src={item.image} alt={item.title} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{item.title}</h3>
                    <button 
                      className="view-button"
                      onClick={() => openModal(item)}
                    >
                      View Details
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="detail-arrow">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for portfolio item details */}
      {isModalOpen && selectedItem && (
        <div className="portfolio-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="video-container">
              <video controls autoPlay muted>
                <source src={selectedItem.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="modal-details">
              <h2>{selectedItem.title}</h2>
              <div className="meta-info">
                <span><strong>Date:</strong> {selectedItem.date}</span>
                <span><strong>Category:</strong> {selectedItem.category}</span>
              </div>
              <p className="description">{selectedItem.description}</p>
              {selectedItem.points && selectedItem.points.length > 0 && (
  <div className="feature-points">
    <h4>Key Features:</h4>
    <ul>
      {selectedItem.points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
)}
              <div className="technologies">
                <h4>Technologies Used:</h4>
                <ul>
                  {selectedItem.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;