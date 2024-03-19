import React, { useState, useEffect } from 'react';
import House from './House'; // Adjust the path as necessary
import './Phone.css'; // Your phone specific styles

const Phone = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  const [showHouse, setShowHouse] = useState(true); // New state to control display

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);

    // New useEffect for changing the display after 5 seconds
    const fadeTimer = setTimeout(() => {
      setShowHouse(false); // Hide the House component after 5 seconds
    }, 5000);

    return () => {
      clearInterval(timer); // Cleanup the interval on component unmount
      clearTimeout(fadeTimer); // Cleanup the timeout on component unmount
    };
  }, []); // Empty dependency array means these effects run once on mount

  return (
    <div className="phone">
      <div className="notch"></div>
      <div className="time">{currentTime}</div>
      {showHouse ? (
        <House />
      ) : (
        <div className="safe-message">Wherever you go, know you're home is safe.</div> // Display this message when showHouse is false
      )}
    </div>
  );
};

export default Phone;
