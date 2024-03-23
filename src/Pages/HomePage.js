import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import Phone from './Home/Phone';
import Mountains from './Home/MountainRanges';

const HomePage = () => {
  const [showComponent, setShowComponent] = useState('phone');
  const [showSpotlight, setShowSpotlight] = useState(true);
  const phoneRef = useRef(null);

  // We will use CSS variables for the spotlight position, so no state is needed here
  useEffect(() => {
    const updateSpotlightPosition = () => {
      if (phoneRef.current) {
        const rect = phoneRef.current.getBoundingClientRect();
        const x = `${rect.left + rect.width / 2}px`;
        const y = `${rect.top + rect.height / 2}px`;
        document.documentElement.style.setProperty('--spotlight-x', x);
        document.documentElement.style.setProperty('--spotlight-y', y);
      }
    };

    // Update position when the component is mounted or window is resized
    updateSpotlightPosition();
    window.addEventListener('resize', updateSpotlightPosition);

    const timer = setTimeout(() => {
      setShowComponent('mountains');
      setShowSpotlight(false); // Begin fading out the spotlight
    }, 5000); // Start fading out after 5 seconds

    // Clean up event listener and timer when component unmounts
    return () => {
      window.removeEventListener('resize', updateSpotlightPosition);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='home-container'>
      <div
        className={`spotlight ${showSpotlight ? 'visible' : 'hidden'}`}
      ></div>
      <div
        ref={phoneRef}
        className={`phone-container ${showComponent === 'phone' ? 'visible' : 'hidden'}`}
      >
        <Phone />
      </div>
      <div className={`component mountains ${showComponent === 'mountains' ? 'visible' : 'hidden'}`}>
        <Mountains />
      </div>
    </div>
  );
};

export default HomePage;
