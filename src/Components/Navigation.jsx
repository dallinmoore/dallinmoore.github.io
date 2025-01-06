import React, { useState, useEffect } from 'react';
import './Navigation.css';

function Navigation({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getOffset = (index) => {
    const distance = index - activeIndex;
    const spacing = Math.abs(distance) === 1 
      ? 140 * Math.sign(distance)
      : 80 * distance + (Math.sign(distance) * 60);
    return spacing;
  };

  const getSectionId = (itemName) => {
    return itemName.toLowerCase().replace(/\s+/g, '');
  };

  const scrollToSection = (index, itemName) => {
    setActiveIndex(index);
    const sectionId = getSectionId(itemName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => 
        document.getElementById(getSectionId(item))
      );
      
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top >= -window.innerHeight / 2 && rect.top <= window.innerHeight / 2;
      });

      if (currentSection !== -1 && currentSection !== activeIndex) {
        setActiveIndex(currentSection);
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [items, activeIndex]);

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
          onClick={() => scrollToSection(index, item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Navigation;