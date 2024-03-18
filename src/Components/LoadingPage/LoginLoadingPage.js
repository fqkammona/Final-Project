// LoginLoadingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginLoadingPage.css';
import Car from './Car';
import House from '../../Pages/Home/House';
import Background from './Background';

const LoginLoadingPage = () => {
  const [carPosition, setCarPosition] = useState(-20);
  const [hasCarStopped, setHasCarStopped] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const stopPosition = screenWidth - 400; // Adjust if necessary

    const moveCar = () => {
      const frameRate = 10;
      const totalDistance = stopPosition + Math.abs(carPosition);
      const speed = totalDistance / (5000 / frameRate);

      const timer = setInterval(() => {
        setCarPosition(prevPosition => {
          const nextPosition = prevPosition + speed;
          if (nextPosition >= stopPosition) {
            clearInterval(timer);
            setHasCarStopped(true); // Car has stopped
            // Set timeout for redirecting after 5 seconds
            setTimeout(() => {
              navigate('/dashboard'); // Use the navigate function from useNavigate hook
            }, 5000);
            return stopPosition;
          }
          return nextPosition;
        });
      }, frameRate);

      return () => clearInterval(timer);
    };

    moveCar();
  }, [navigate]); // Include navigate in the dependency array

  return (
    <div className="loadingPageContainer">
      {hasCarStopped && <div className="welcomeMessage">Welcome Home</div>}
      <div className="roadContainer">
        <div className="roadLine"></div>
      </div>
      <div className="carContainer" style={{ left: `${carPosition}px` }}>
        <Car />
      </div>
      <div className="houseContainer">
        <House />
      </div>
    </div>
  );
};

export default LoginLoadingPage;
