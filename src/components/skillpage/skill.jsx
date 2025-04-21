import React, { useState, useEffect } from 'react';
import './skill.scss';
import SkillsContent from '../../components/skillpage/SkillsContent';
import Experience from '../../components/skillpage/Experience';
import Education from '../../components/skillpage/Education';
import CertificatesModal from '../../components/skillpage/CertificatesModal';
import NumbersSection from '../../components/skillpage/NumbersSection';
import { 
  certificates, 
  targetPercentages, 
  targetCounters 
} from '../../components/skillpage/constants';

const Skills = () => {
  const [activeButton, setActiveButton] = useState('skills');
  const [counted, setCounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [percentages, setPercentages] = useState({
    react: 0,
    flutter: 0,
    android: 0,
    firebase: 0,
    javascript: 0,
    sass: 0
  });
  const [counters, setCounters] = useState({
    training: 0,
    courses: 0,
    projects: 0,
    experience: 0
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (counted) {
      const duration = 2000;
      const startTime = Date.now();

      const animateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setPercentages({
          react: Math.floor(progress * targetPercentages.react),
          flutter: Math.floor(progress * targetPercentages.flutter),
          android: Math.floor(progress * targetPercentages.android),
          firebase: Math.floor(progress * targetPercentages.firebase),
          javascript: Math.floor(progress * targetPercentages.javascript),
          java: Math.floor(progress * targetPercentages.java)
        });
        setCounters({
          training: Math.floor(progress * targetCounters.training),
          courses: Math.floor(progress * targetCounters.courses),
          projects: Math.floor(progress * targetCounters.projects),
          experience: Math.floor(progress * targetCounters.experience)
        });
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      animateCount();
    }
  }, [counted]);
  const renderContent = () => {
    switch (activeButton) {
      case 'skills':
        return <SkillsContent percentages={percentages} />;
      case 'experience':
        return <Experience />;
      case 'education':
        return <Education />;
      default:
        return null;
    }
  };
  return (
    <div className="skills-page">
      <section className="skills-section">
        <div className="skill-row">
        <div className="skills-container">
          <h2 className="skills-heading">
            <span className="heading-text">
              My expert <br/>
              <span className="heading-line">areas<span className="heading-underline"></span></span>
            </span>
          </h2>
          <p className="expert">You can express yourself however you want and whenever you want, for free. You can customize a template or make your own from scratch, with an immersive library at your disposal. You can express yourself however you want and whenever you free.<br/><br/>You can customize a template or make your own from scratch, with an immersive library at your disposal.</p>
          <button className="certificate" onClick={() => setShowModal(true)}>
              Certificates
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cert-icon">
                <path d="M15.25 22.7502H9.25C3.82 22.7502 1.5 20.4302 1.5 15.0002V9.00024C1.5 3.57024 3.82 1.25024 9.25 1.25024H14.25C14.66 1.25024 15 1.59024 15 2.00024C15 2.41024 14.66 2.75024 14.25 2.75024H9.25C4.64 2.75024 3 4.39024 3 9.00024V15.0002C3 19.6102 4.64 21.2502 9.25 21.2502H15.25C19.86 21.2502 21.5 19.6102 21.5 15.0002V10.0002C21.5 9.59024 21.84 9.25024 22.25 9.25024C22.66 9.25024 23 9.59024 23 10.0002V15.0002C23 20.4302 20.68 22.7502 15.25 22.7502Z" fill="currentColor" />
                <path d="M22.25 10.7502H18.25C14.83 10.7502 13.5 9.42023 13.5 6.00023V2.00023C13.5 1.70023 13.68 1.42023 13.96 1.31023C14.24 1.19023 14.56 1.26023 14.78 1.47023L22.78 9.47023C22.99 9.68023 23.06 10.0102 22.94 10.2902C22.82 10.5702 22.55 10.7502 22.25 10.7502ZM15 3.81023V6.00023C15 8.58023 15.67 9.25023 18.25 9.25023H20.44L15 3.81023Z" fill="currentColor" />
                <path d="M13.25 13.7502H7.25C6.84 13.7502 6.5 13.4102 6.5 13.0002C6.5 12.5902 6.84 12.2502 7.25 12.2502H13.25C13.66 12.2502 14 12.5902 14 13.0002C14 13.4102 13.66 13.7502 13.25 13.7502Z" fill="currentColor" />
                <path d="M11.25 17.7502H7.25C6.84 17.7502 6.5 17.4102 6.5 17.0002C6.5 16.5902 6.84 16.2502 7.25 16.2502H11.25C11.66 16.2502 12 16.5902 12 17.0002C12 17.4102 11.66 17.7502 11.25 17.7502Z" fill="currentColor" />
              </svg>
            </button>
        </div>
        
        <div className="right-section">
          <div className="skill-buttons">
          <button 
              className={`skills ${activeButton === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveButton('skills')}
            >
              Skills
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="skills-arrow">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button 
              className={`skills ${activeButton === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveButton('experience')}
            >
              Experience
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="skills-arrow">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button 
              className={`skills ${activeButton === 'education' ? 'active' : ''}`}
              onClick={() => setActiveButton('education')}
            >
              Education
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="skills-arrow">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {renderContent()}
        </div>
        </div>
        <NumbersSection counters={counters} />
      </section>
      {showModal && <CertificatesModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Skills;