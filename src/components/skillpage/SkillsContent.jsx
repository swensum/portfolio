import React from 'react';
import { FaReact, FaAndroid } from 'react-icons/fa';
import { SiFlutter, SiFirebase, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa'; // Java icon is in the FA package

const SkillsContent = ({ percentages }) => (
  <div className="skills-icons-container" key="skills">
    <div className="skill-icon">
      <div className="icon-circle">
        <FaReact className="icon" />
      </div>
      <span>React({percentages.react}%)</span>
    </div>
    <div className="skill-icon">
      <div className="icon-circle">
        <SiFlutter className="icon" />
      </div>
      <span>Flutter({percentages.flutter}%)</span>
    </div>
    <div className="skill-icon">
      <div className="icon-circle">
        <FaAndroid className="icon" />
      </div>
      <span>Android({percentages.android}%)</span>
    </div>
    <div className="skill-icon">
      <div className="icon-circle">
        <SiFirebase className="icon" />
      </div>
      <span>Firebase({percentages.firebase}%)</span>
    </div>
    <div className="skill-icon">
      <div className="icon-circle">
        <SiJavascript className="icon" />
      </div>
      <span>JavaScript({percentages.javascript}%)</span>
    </div>
    <div className="skill-icon">
      <div className="icon-circle">
        <FaJava className="icon" /> {/* Changed from SiJava to FaJava */}
      </div>
      <span>Java({percentages.java}%)</span>
    </div>
  </div>
);
export default SkillsContent;