// HomePage.js
import React from 'react';
import './HomePage.css';
import Phone from './Home/Phone'; // Make sure to import the Phone component

const HomePage = () => {
  return (
    <div className='container'>
      <Phone /> {/* Use the Phone component */}
    </div>
  );
};

export default HomePage;
