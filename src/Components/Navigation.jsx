import React, { useState } from 'react';
import './Navigation.css';

function Navigation() {
  const items = ['Home', 'About', 'Projects', 'Contact'];
  const [activeIndex, setActiveIndex] = useState(0);

  const getOffset = (index) => {
    const distance = index - activeIndex;
    // Reduced primary gap from 200px to 140px
    // Reduced secondary gap from 120px to 80px
    const spacing = Math.abs(distance) === 1 
      ? 140 * Math.sign(distance)
      : 80 * distance + (Math.sign(distance) * 60);
    return spacing;
  };

  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <div
          key={item}
          style={{ 
            transform: `translate(-50%, calc(-50% + ${getOffset(index)}px))`
          }}
          className={
            index < activeIndex
              ? 'nav-item above'
              : index === activeIndex
              ? 'nav-item active'
              : 'nav-item below'
          }
          onClick={() => setActiveIndex(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Navigation;