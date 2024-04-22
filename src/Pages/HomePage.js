import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Phone from '../Components/LoadingPage/Phone';
import Mountains from './Home/MountainRanges';

const HomePage = () => {
  const [showPhone, setShowPhone] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhone(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className='home-container'>
      {showPhone ? (
        <div className='show-phone'>
          <Phone />
          <div>Where ever you go, know your home is safe</div>
        </div>
      ) : (
        <div className='show-mountains'>
          <Mountains />
        </div>
      )}
    </div>
  );
};

export default HomePage;
