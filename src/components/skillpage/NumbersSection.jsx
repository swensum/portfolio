import React from 'react';

const STATS = [
  { key: 'training', label: 'Training' },
  { key: 'courses', label: 'Courses' },
  { key: 'projects', label: 'Projects' },
  { key: 'experience', label: 'Experience' },
];

const NumbersSection = ({ counters }) => (
  <div className="numbers-container">
    {STATS.map(({ key, label }) => (
      <div className="number-item" key={key}>
        <span className="number">{counters[key]}+</span>
        <span className="number-label">{label}</span>
      </div>
    ))}
  </div>
);

export default NumbersSection;