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
      description: 'I have developed a modern and user-friendly restaurant Android application using Flutter and Appwrite, with development handled in Visual Studio Code. The app allows users to browse a dynamic food menu with images and detailed descriptions, add items to a cart, and place orders with ease.It features secure user authentication and a responsive design that adapts smoothly across Android devices.The backend is powered by Appwrite, ensuring efficient data management and secure operations.This project highlights my skills in cross-platform mobile development, backend integration, and delivering a seamless customer experience in the food service domain. ',
      technologies: ['Flutter', 'Dart', 'Appwrite', 'VS Code'],
      date: 'March 2023'
    },
    {
      id: 2,
      title: 'Education consultancy Website',
      category: 'Web',
      image: '/images/portfolio/felix.png',
      video: '/videos/Untitled1.mov', 
      width: 'square',
      description: 'I have Developed the frontend of an education consultancy website using React and Vite, focused on providing students with information about study programs, admission guidance, and visa assistance. The site features a modern, responsive design with dedicated sections for services, partner universities, testimonials, and contact forms to enhance user engagement and accessibility.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      client: 'National Bank',
      date: 'January 2023'
    },
    {
      id: 3,
      title: 'A health monitoring app ',
      category: 'Mobile',
      image: '/images/portfolio/health.jpg',
      video: '/videos/health.mp4', 
      width: 'tall',
      description: ' I have Developed a comprehensive health monitoring Android app using various programming language, tested and optimized for  real Android devices. The app features a real-time step counter integrated with a calorie burn meter to help users track their daily activity levels. It also includes a BMI calculator for assessing body health, personalized diet suggestions based on user data, and a diet monitoring system to help users stay on track with their nutrition goals. With a clean, intuitive interface and accurate health tracking, the app empowers users to maintain a healthier lifestyle through smart and easy-to-use tools.',
      technologies: ['Java', 'XML', 'Kotlin','Android Studio'],
      client: 'Tech Solutions Inc.',
      date: 'November 2022'
    },
    {
      id: 4,
      title: 'Yet To Be Come ',
      category: 'Design',
      image: '/images/portfolio/download.jpeg',
      width: 'tall',
      description: 'Yet to be come.',
      technologies: ['null', 'null', 'null'],
      client: 'HealthFit',
      date: 'September 2022'
    },
    {
      id: 5,
      title: 'Soltech(A Web Application)',
      category: 'Web',
      image: '/images/portfolio/soltech.jpg',
      width: 'square',
      video: '/videos/Untitled.mov', 
      description: 'I Designed the frontend of a web application using React and Vite, aimed at helping users easily create and customize their own eCommerce websites. The platform offers intuitive tools and components that allow for flexible layout design, product showcasing, and branding — all without needing to write code.',
      technologies: ['React', 'Vite', 'VS code'],
      client: 'Startup Ventures',
      date: 'July 2022'
    },
    {
      id: 6,
      title: 'To-do Mobile application ',
      category: 'Mobile',
      image: '/images/portfolio/todo.png',
      video: '/videos/todo.mov', 
      width: 'square',
      description: 'I have Created a simple and efficient To-Do application, designed to help users manage their daily tasks with ease. The app features task creation, editing, deletion, and completion tracking within a clean and responsive user interface. It ensures smooth performance across Android devices and showcases effective use of Flutter widgets, state management, and intuitive design for an organized task management experience.',
      technologies: ['flutter', 'Dart', 'VS code '],
      client: 'Creative Network',
      date: 'May 2022'
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