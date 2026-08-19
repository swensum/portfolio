import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { SiReact, SiFlutter, SiFirebase, SiAndroidstudio } from 'react-icons/si';

import About from '../components/aboutpage/about';
import Skills from '../components/skillpage/skill';
import './homepage.scss';
import port from '/images/fb.jpg';
import ServicePage from '../components/service/servicepage';
import PortfolioPage from '../components/portfolio/portfoliopage';
import TestimonialsPage from '../components/testimonial/testimonial-page';
import ContactPage from '../components/contact/contactpage';
import Footer from '../components/footer/footerpage';
import AmbientBackground from '../components/particles-background';
// ^ adjust this import path to wherever you place ambient-background.jsx

const ROLES = ['Web Apps', 'Mobile Apps', 'Brand Content', 'UI/UX', 'Freelance Work'];

// Icon-font badges instead of image files — these always render crisply
// at any size and never show up broken like a missing/low-res PNG would.
const STACK = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Flutter', Icon: SiFlutter, color: '#54C5F8' },
  { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  { name: 'Android', Icon: SiAndroidstudio, color: '#3DDC84' },
];

// Types out each role, pauses, deletes, moves to the next — a small
// crafted detail instead of a plain fade/swap. Falls back to a plain
// interval swap (no per-letter animation) when the user prefers reduced
// motion.
const useTypewriter = (words, { typeSpeed = 70, deleteSpeed = 40, pause = 1400 } = {}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reduceMotionRef.current) {
      setText(words[index]);
      const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
      return () => clearInterval(id);
    }

    const current = words[index];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
};

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});
  const roleText = useTypewriter(ROLES);

  // 3D tilt state for the hero photo — follows the cursor
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroImageRef = useRef(null);

  // ---- background music ----
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const setSectionRef = (section) => (el) => {
    sectionRefs.current[section] = el;
  };

  const handleHeroMouseMove = useCallback((e) => {
    const el = heroImageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  }, []);

  const handleHeroMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked — will start on first user interaction instead
        setIsPlaying(false);
      }
    };

    tryPlay();
  }, []);

  useEffect(() => {
    if (hasInteracted || isPlaying) return;

    const startOnInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Audio playback failed:', err);
          });
      }
      setHasInteracted(true);
    };

    const opts = { once: true, passive: true };

    window.addEventListener('touchstart', startOnInteraction, opts);
    window.addEventListener('pointerdown', startOnInteraction, opts);
    window.addEventListener('click', startOnInteraction, opts);
    window.addEventListener('keydown', startOnInteraction, opts);

    return () => {
      window.removeEventListener('touchstart', startOnInteraction);
      window.removeEventListener('pointerdown', startOnInteraction);
      window.removeEventListener('click', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
    };
  }, [hasInteracted, isPlaying]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = ['home', 'about', 'skill', 'service', 'portfolio', 'testimonial', 'contact'];

      if (scrollPosition < 200) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => sectionRefs.current.about?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="landing-page">
      
      <audio ref={audioRef} src="/audio/music.mp3" loop preload="auto" />

      <div className="hero-backdrop">
        <AmbientBackground />

        <div className="hero-content">
          <header className="hero-section">
            <div className="status-pill">
              <span className="status-dot" />
              Available for freelance work
            </div>

            <p className="eyebrow">// Full-stack &amp; mobile developer, Kathmandu</p>
            <h1>
              Sumit Shrestha<span role="img" aria-label="waving hand">👋</span>
            </h1>

            <div className="skills-container">
              <span className="type-label">Building</span>
              <p className="changing-skill">
                {roleText}
                <span className="cursor" aria-hidden="true" />
              </p>
            </div>

            <p className="tagline">
              I'm a tech enthusiast from Nepal, dedicated to building products, brands and
              experiences people actually enjoy using.
            </p>

            <div className="buttons">
              <a href="#contact" className="hello-button">
                Say Hello
                <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-arrow">
                  <path d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z" fill="currentColor" />
                  <path d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z" fill="currentColor" />
                </svg>
              </a>
              <a href="#portfolio" className="work">
                My Works
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="work-arrow">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <p className="social">
              Follow me:
              <span className="social-icons">
                <a href="https://github.com/swensum" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/swen-shrestha-a89041304/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className="social-icon" />
                </a>
                <a href="https://www.facebook.com/swenshrestha/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook className="social-icon" />
                </a>
                <a href="YOUR_WHATSAPP_URL" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp className="social-icon" />
                </a>
              </span>
            </p>
          </header>

          <div
            className="hero-image"
            ref={heroImageRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
          >
            <div className="hero-image-inner" style={{ '--rx': `${tilt.x}deg`, '--ry': `${tilt.y}deg` }}>
              <div className="glow-ring" />
              <img src={port} alt="Sumit Shrestha" className="hero-img" />
            </div>

            {/* Stack badges replace the old orbiting logo images — icon
                fonts always render cleanly, unlike PNGs that may be
                missing or low quality. */}
            <div className="stack-badges">
              {STACK.map(({ name, Icon, color }) => (
                <span className="stack-badge" key={name} style={{ '--badge-color': color }}>
                  <Icon />
                  <span className="stack-badge-label">{name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button type="button" className="scroll-cue" onClick={scrollToAbout} aria-label="Scroll to about section">
          <span className="scroll-cue-line" />
        </button>
      </div>

      <section id="about" ref={setSectionRef('about')}>
        <About />
      </section>

      <section id="skill" ref={setSectionRef('skill')}>
        <Skills />
      </section>

      <section id="service" ref={setSectionRef('service')}>
        <ServicePage />
      </section>

      <section id="portfolio" ref={setSectionRef('portfolio')}>
        <PortfolioPage />
      </section>

      <section id="testimonial" ref={setSectionRef('testimonial')}>
        <TestimonialsPage />
      </section>

      <section id="contact" ref={setSectionRef('contact')}>
        <ContactPage />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;