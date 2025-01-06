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
    const sectionId = getSectionId(itemName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = items.map(item => 
      document.getElementById(getSectionId(item))
    );

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Adjust this threshold as needed
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sections.indexOf(entry.target);
          if (index !== -1 && index !== activeIndex) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
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