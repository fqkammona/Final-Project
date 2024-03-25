import React from 'react';
import './HomePage.css';
import Mountains from './Home/MountainRanges';

const HomePage = () => {

  return (
    <div className='home-container'>
      <div className='show-mountains'>
        <Mountains />
      </div>
    </div>
  );
};

export default HomePage;
