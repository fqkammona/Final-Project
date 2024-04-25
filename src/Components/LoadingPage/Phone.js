import React, { useState, useEffect } from 'react';
import House from './House'; // Adjust the path as necessary
import { IoIosBatteryFull } from "react-icons/io"; // Import the battery icon
import { FaWifi } from "react-icons/fa";
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
  }, []); 

  return (
    <div className="phone">
      <div className="notch"></div>
       <div className="wifi-icon"><FaWifi /></div>
      <div className="battery-icon"><IoIosBatteryFull /></div>
      <div className="time">{currentTime}</div>
      <House />
    </div>
  );
};

export default Phone;
