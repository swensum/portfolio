import React, { useState, useEffect, useRef, useCallback } from 'react';
import './portfolio.scss';

const CATEGORIES = ['All', 'Web', 'Mobile'];
// Controls what order the category rows stack in when "All" is selected.
const CATEGORY_ORDER = ['Mobile', 'Web'];

// One horizontally-scrolling row for a single category. Owns its own
// scroll/drag/arrow state so multiple rows never interfere with each other.
const CategoryRail = ({ items, variant, onOpenItem }) => {
  const trackRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateRailState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setIsOverflowing(max > 4);
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);

    const cards = Array.from(el.querySelectorAll('.portfolio-item'));
    if (cards.length === 0) return;
    const railCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - railCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  // Re-measure whenever the item set changes or the window resizes — this is
  // what decides whether the row centers itself or goes scrollable.
  useEffect(() => {
    const raf = requestAnimationFrame(updateRailState);
    return () => cancelAnimationFrame(raf);
  }, [items, updateRailState]);

  useEffect(() => {
    window.addEventListener('resize', updateRailState);
    return () => window.removeEventListener('resize', updateRailState);
  }, [updateRailState]);

  // Re-measure whenever the rendered content inside the track actually
  // changes size. This is what catches images finishing their async load:
  // each <img> is sized height:100%/width:auto, so its true width — and
  // therefore whether the row overflows — isn't known until it loads.
  // Without this, a row can get locked into "centered" mode based on a
  // too-small scrollWidth measured before the last image resolved, which
  // then clips the final card with no way to reach it.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      updateRailState();
    });

    observer.observe(el);
    el.querySelectorAll('img').forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [items, updateRailState]);

  const scrollByCards = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.portfolio-item');
    const cardWidth = card ? card.offsetWidth : 260;
    el.scrollBy({ left: direction * (cardWidth + 18), behavior: 'smooth' });
  };

  const scrollToIndex = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelectorAll('.portfolio-item')[index];
    if (!card) return;
    const target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handlePointerDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.classList.add('is-dragging');
  };

  const handlePointerMove = (e) => {
    const el = trackRef.current;
    if (!el || !dragState.current.isDown) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
  };

  const endDrag = () => {
    trackRef.current?.classList.remove('is-dragging');
    dragState.current.isDown = false;
  };

  const handleOpen = (item) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    onOpenItem(item);
  };

  const atStart = scrollProgress <= 0.02;
  const atEnd = scrollProgress >= 0.98;

  return (
    <div className="rail-block">
      <div className="rail-wrapper">
        {isOverflowing && (
          <button
            type="button"
            className="rail-arrow rail-arrow--left"
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <div
          className={`grid-container variant-${variant} ${isOverflowing ? 'is-scrollable' : 'is-centered'}`}
          ref={trackRef}
          onScroll={updateRailState}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {items.map((item) => (
            <div key={item.id} className="portfolio-item" onClick={() => handleOpen(item)}>
              <div className="item-image">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable="false"
                  onLoad={updateRailState}
                />
                <div className="image-overlay">
                  <span className="item-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="view-button">
                    View Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="detail-arrow">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isOverflowing && (
          <button
            type="button"
            className="rail-arrow rail-arrow--right"
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {isOverflowing && (
        <div className="rail-dots" role="tablist" aria-label="Project navigation">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`rail-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${item.title}`}
              aria-current={i === activeIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Design projects removed — only Mobile and Web are tracked as categories
  // now, so there's no orphaned data sitting around unused.
  const portfolioItems = [
    {
      id: 1,
      title: 'Restaurant Mobile Application',
      category: 'Mobile',
      image: '/images/portfolio/mobile.jpg',
      video: '/videos/mobile.mp4',
      description:
        'I have developed a modern and user-friendly restaurant Android application using Flutter Framework, where I have:',
      points: [
        'Built client-side app for customers to browse menu, place orders, and view order history in real-time.',
        'Created admin dashboard for restaurant staff to manage orders, update menu items, and send push notifications.',
        'Integrated Google Maps API to enable location-based services — map directions, user locations, etc.',
        'Implemented real-time push notifications on order status updates.',
        "Focused on responsive UI/UX using Flutter's flexible widget system for a smooth experience on various Android devices."
      ],
      technologies: ['Flutter', 'Dart', 'Supabase', 'Firebase Push Notification', 'Google Map API', 'VS Code'],
      date: 'January 2025'
    },
    {
      id: 2,
      title: 'A Health Monitoring App',
      category: 'Mobile',
      image: '/images/portfolio/health.jpg',
      video: '/videos/health.mp4',
      description: 'I have developed a comprehensive health monitoring Android app.',
      points: [
        'Implemented a real-time step counter using the Android Sensor API, enabling users to track their daily physical activity.',
        'Designed and integrated a BMI calculator, allowing users to input height and weight and get personalized results.',
        'Built a diet monitoring and suggestion module, offering tailored food recommendations based on BMI and user goals (e.g., weight loss, gain, or maintenance).',
        'Implemented real-time push notifications on order status updates.',
      ],
      technologies: ['Java', 'XML', 'Kotlin', 'Android Studio'],
      client: 'Tech Solutions Inc.',
      date: 'November 2022'
    },
    {
      id: 3,
      title: 'To-Do Mobile Application',
      category: 'Mobile',
      image: '/images/portfolio/todo.jpeg',
      video: '/videos/todo.mp4',
      description: 'I have created a simple and efficient To-Do application.',
      points: [
        'Built a clean and intuitive UI using Flutter to allow users to add, edit, delete, and categorize tasks efficiently.',
        'Integrated SQLite for a lightweight, offline-first local database to persist task data across sessions.',
        'Implemented Flutter Local Notifications to remind users of scheduled tasks and daily goals.',
        'Enabled users to set due dates, mark tasks as complete, and filter views based on task status or priority.',
        'Implemented charts to visualize task completion rates, daily/weekly productivity, and category distribution.'
      ],
      technologies: ['Flutter', 'Dart', 'SQLite', 'VS Code'],
      client: 'Creative Network',
      date: 'May 2022'
    },
    {
      id: 4,
      title: 'Education Consultancy Website',
      category: 'Web',
      image: '/images/portfolio/felix.png',
      video: '/videos/Untitled1.mov',
      description: 'I have developed the frontend of an education consultancy website.',
      points: [
        'Built with fast performance and a modular component-based architecture.',
        'Created reusable components such as navbars, service cards, testimonial sliders, and contact forms.',
        'Integrated smooth scroll, hover animations, and interactive elements for an engaging user experience.',
      ],
      technologies: ['React', 'SASS', 'React Router DOM'],
      client: 'National Bank',
      date: 'January 2023'
    },
    {
      id: 5,
      title: 'Soltech (A Web Application)',
      category: 'Web',
      image: '/images/portfolio/soltech.jpg',
      video: '/videos/Untitled.mov',
      description: 'I designed the frontend of a web application using React and Vite.',
      points: [
        'Built with fast performance and a modular component-based architecture.',
        'Built a dynamic UI builder interface, allowing users to easily create and customize their own eCommerce websites without writing code.',
        'Developed reusable React components for core features like product cards, banners, carousels, and customizable layouts.',
      ],
      technologies: ['React', 'Vite', 'VS Code'],
      client: 'Startup Ventures',
      date: 'July 2022'
    },
    {
      id: 6,
      title: 'Devansh Suppliers (A Web Application)',
      category: 'Web',
      image: '/images/portfolio/devansh.png',
      video: '/videos/Untitled.mov',
      link: 'https://devansh-supplers.web.app/', 
      description: 'A modern, responsive e-commerce website developed for Devansh Suppliers, a hardware and kitchen accessories business. The platform provides customers with an easy way to explore products, view detailed product information, and get in touch with the business.',
      points: [
        'Responsive Flutter Web storefront for desktop, tablet, and mobile',
        'Firebase Firestore for product and application data',
        'Cloudinary for optimized product image hosting',
        'WhatsApp integration for quick customer inquiries',
        'Firebase Hosting with CI/CD deployment workflow',
      ],
      technologies: ['Flutter', 'Firebase', 'Firestore', 'Cloudinary', 'GitHub', 'Firebase Hosting'],
      client: 'Devansh Suppliers',
      date: 'Auguest 2026'
    },
     {
      id: 7,
      title: 'Vegis (A E-commerce Website)',
      category: 'Web',
      image: '/images/portfolio/vegis.png',
      video: '/videos/Untitled.mov',
      link: 'https://bazar-to-ghar.vercel.app/', 
      description: 'A modern and responsive e-commerce website built for an online fruits and vegetables store. The platform allows customers to browse fresh produce, explore product details, manage their shopping cart, and place orders through a simple and user-friendly interface.',
      points: [
        'Responsive e-commerce interface built with React and Vite',
        'Product browsing with categories and detailed product information',
        'Firebase Firestore for storing and managing product and order data',
        'Responsive design optimized for desktop, tablet, and mobile',
        'Clean and user-friendly shopping experience',
      ],
      technologies: ['React', 'Vite', 'Firestore', 'Vercel Domain', 'GitHub'],
      
      date: 'April 2025'
    },
  ];

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const groups = CATEGORY_ORDER
    .map((category) => ({
      category,
      items: filteredItems.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

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
          <p className={`eyebrow ${isPortVisible ? 'fade-in' : ''}`}>// Portfolio</p>
          <h2 className={`port-heading ${isPortVisible ? 'fade-in' : ''}`}>
            <span className="heading-port">My Portfolio</span>
            <span className="inline"></span>
          </h2>
        </div>
        <div className="port-word">
          <p className={`my ${isPortVisible ? 'fade-in' : ''}`}>My Amazing Works</p>
          <p className={`defination ${isPortVisible ? 'fade-in' : ''}`}>
            A handful of the apps and websites I've shipped. 
          </p>
        </div>
      </section>

      <section className="portfolio-categories">
        <div className="categories-container">
          <ul className="category-list">
            {CATEGORIES.map((category) => (
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
        {groups.length === 0 ? (
          <p className="rail-empty">No projects in this category yet.</p>
        ) : (
          groups.map(({ category, items }) => (
            <div key={category} className="rail-section">
              <CategoryRail
                items={items}
                variant={category === 'Mobile' ? 'mobile' : 'web'}
                onOpenItem={openModal}
              />
            </div>
          ))
        )}
      </section>

      {isModalOpen && selectedItem && (
        <div className="portfolio-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <button type="button" className="modal-close" onClick={closeModal} aria-label="Close project details">
              &times;
            </button>

            <div className="video-container">
              {selectedItem.video ? (
                <video controls autoPlay muted>
                  <source src={selectedItem.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={selectedItem.image} alt={selectedItem.title} className="preview-image" />
              )}
            </div>

            <div className="modal-details">
              <p className="modal-eyebrow">// {selectedItem.category}</p>
              <h2>{selectedItem.title}</h2>

              <div className="meta-info">
                <span><strong>Date:</strong> {selectedItem.date}</span>
                <span><strong>Category:</strong> {selectedItem.category}</span>
              </div>

              <p className="description">{selectedItem.description}</p>

              {selectedItem.points && selectedItem.points.length > 0 && (
                <div className="feature-points">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedItem.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.technologies.length > 0 && (
                <div className="technologies">
                  <h4>Technologies Used</h4>
                  <ul>
                    {selectedItem.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;