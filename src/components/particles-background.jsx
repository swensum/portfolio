import React, { useEffect, useState } from 'react';
import './particles-background.scss';

// Layered ridgeline silhouettes that drift slowly across the hero — a nod
// to Kathmandu's skyline that also reads as a signal / waveform for the
// developer side of the brand. Pure SVG + CSS, no canvas, no external
// image files, so there's nothing that can render broken or low-res.
const AmbientBackground = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const ridgePath =
    'M0,220 C120,180 220,260 340,230 C460,200 540,120 660,140 ' +
    'C780,160 840,240 960,220 C1080,200 1160,130 1280,150 ' +
    'C1360,164 1400,190 1440,180 L1440,400 L0,400 Z';

  return (
    <div className={`ambient-background ${reduceMotion ? 'is-static' : ''}`} aria-hidden="true">
      <div className="ambient-glow" />

      <svg className="ridge ridge--back" viewBox="0 0 2880 400" preserveAspectRatio="none">
        <path d={ridgePath} transform="translate(0,0)" />
        <path d={ridgePath} transform="translate(1440,0)" />
      </svg>

      <svg className="ridge ridge--mid" viewBox="0 0 2880 400" preserveAspectRatio="none">
        <path d={ridgePath} transform="translate(0,30) scale(1,0.9)" />
        <path d={ridgePath} transform="translate(1440,30) scale(1,0.9)" />
      </svg>

      <svg className="ridge ridge--front" viewBox="0 0 2880 400" preserveAspectRatio="none">
        <path d={ridgePath} transform="translate(0,60) scale(1,0.75)" />
        <path d={ridgePath} transform="translate(1440,60) scale(1,0.75)" />
      </svg>
    </div>
  );
};

export default AmbientBackground;