import React, { useState, useEffect } from 'react';
import House from './House'; // Adjust the path as necessary
import './Phone.css'; // Your phone specific styles

const Phone = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);

    return () => {
      clearInterval(timer); // Cleanup the interval on component unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="phone">
      <div className="notch"></div>
      <div className="time">{currentTime}</div>
      <House />
    </div>
  );
};

export default Phone;
