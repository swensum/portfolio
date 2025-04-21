import React from 'react';

const NumbersSection = ({ counters }) => (
    <div className="numbers-container">
    <div className="number-item">
      <div className="number-back"> 
        <span className="number">{counters.training}+</span>
        </div>
     
      <span className="number-label">Training</span>
    </div>
    <div className="number-item">
    <div className="number-back"> 
      <span className="number">{counters.courses}+</span>
      </div>
      <span className="number-label">Courses</span>
    </div>
    <div className="number-item">
    <div className="number-back"> 
      <span className="number">{counters.projects}+</span>
      </div>
      <span className="number-label">Projects</span>
    </div>
    <div className="number-item">
    <div className="number-back"> 
      <span className="number">{counters.experience}+</span>
      </div>
      <span className="number-label">Experience</span>
    </div>
  </div>
);

export default NumbersSection;