import React, { useState, useEffect } from 'react';
import { IoIosBatteryFull } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import './PhoneNotification.css';

const PhoneNotification = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [showDisplay, setShowDisplay] = useState(false);
    const [vibrate, setVibrate] = useState(false);
  
    useEffect(() => {
      // Set the vibration to happen before the display turns on
      setTimeout(() => {
        setVibrate(true); // Start vibration
        setTimeout(() => {
          setShowDisplay(true); // After the vibration, show the display
        }, 500); // This should match the duration of the vibration animation
      }, 1000);
  
      const timer = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []); 
  
    return (
      <div className={`phone-notification ${vibrate ? 'active' : ''}`}>
        <div className="notch-notification"></div>
        {showDisplay && (
          <>
           <div className="notch"></div>
            <div className="wifi-icon"><FaWifi /></div>
            <div className="battery-icon"><IoIosBatteryFull /></div>
            <div className="date-notification">{currentDate}</div>
            <div className="time-notification">{currentTime}</div>
            <div className="notification-box">
              <div className="notification-icon"><FaHeart /></div>
              <div className="notification-info">
                <div className="notification-sender">GIRL C0DED</div>
                <div className="notification-message">Sirena has arrived at home</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default PhoneNotification;
