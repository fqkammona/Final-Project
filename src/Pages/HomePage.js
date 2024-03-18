import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Phone from './Home/Phone';
import Mountains from './Home/Mountains';

const HomePage = () => {
  const [showComponent, setShowComponent] = useState('phone');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent('mountains');
    }, 5000); // 5000ms = 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='home-container'>
      <div className={`phone-container ${showComponent === 'phone' ? 'visible' : ''}`}>
        <Phone />
        <p className="phone-text">Wherever you go, know you're home is safe.</p>
      </div>
      <div className={`component mountains ${showComponent === 'mountains' ? 'visible' : ''}`}>
        <Mountains />
      </div>
    </div>
  );
};

export default HomePage;
