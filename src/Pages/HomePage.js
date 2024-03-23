import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Phone from './Home/Phone';
import Mountains from './Home/MountainRanges';

const HomePage = () => {
  const [showComponent, setShowComponent] = useState('');

  useEffect(() => {
    // Delay showing the components
    const phoneTimer = setTimeout(() => {
      setShowComponent('phone');
    }, 1000);

    const mountainsTimer = setTimeout(() => {
      setShowComponent('mountains');
    }, 6000);

    return () => {
      clearTimeout(phoneTimer);
      clearTimeout(mountainsTimer);
    };
  }, []);

  return (
    <div className='home-container'>
      <div className={`phone-container ${showComponent === 'phone' ? 'visible' : 'hidden'}`}>
        <Phone />
      </div>
      <div className={`component mountains ${showComponent === 'mountains' ? 'visible' : 'hidden'}`}>
        <Mountains />
      </div>
    </div>
  );
};

export default HomePage;
