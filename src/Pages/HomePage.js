// HomePage.js
import React from 'react';
import './HomePage.css';
import Phone from './Home/Phone'; // Make sure to import the Phone component
import Mountains from './Home/Mountains';

const HomePage = () => {
  return (
    <div className='home-container'>

      <Mountains />

    </div>
  );
};

export default HomePage;
