import React from 'react';
import { FaReact, FaAndroid, FaDatabase } from 'react-icons/fa';
import { SiFlutter, SiFirebase, SiJavascript } from 'react-icons/si';

const SKILLS = [
  { key: 'react', label: 'React', Icon: FaReact, color: '#61DAFB' },
  { key: 'flutter', label: 'Flutter', Icon: SiFlutter, color: '#54C5F8' },
  { key: 'android', label: 'Android', Icon: FaAndroid, color: '#3DDC84' },
  { key: 'firebase', label: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  { key: 'javascript', label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { key: 'sql', label: 'SQL', Icon: FaDatabase, color: '#52C7B8' },
];

const SkillsContent = ({ percentages }) => (
  <div className="skills-icons-container" key="skills">
    {SKILLS.map(({ key, label, Icon, color }) => (
      <div className="skill-icon" key={key}>
        <div className="icon-circle" style={{ '--skill-color': color }}>
          <Icon className="icon" />
        </div>
        <div className="skill-meta">
          <span className="skill-name">{label}</span>
          <span className="skill-percent">{percentages[key]}%</span>
        </div>
        <div className="skill-bar">
          <div
            className="skill-bar-fill"
            style={{ width: `${percentages[key]}%`, '--skill-color': color }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default SkillsContent;