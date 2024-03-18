// LoginLoadingPage.js
import React, { useState, useEffect } from 'react';
import './LoginLoadingPage.css';
import Car from './Car';
import House from '../../Pages/Home/House';
import Background from './Background'; // Make sure the path is correct

const LoginLoadingPage = () => {
  const [carPosition, setCarPosition] = useState(-20); // Initial position of the car

  return (
    <div className="loadingPageContainer">
      <Background /> {/* Include the Background component */}
        <div className="carContainer">
         <Car />
      </div>
      <div className="houseContainer">
        <House />
      </div>
    </div>
  );
};

export default LoginLoadingPage;
