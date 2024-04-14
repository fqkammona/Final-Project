import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaCog } from 'react-icons/fa';
import { BsCalendar4Event } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoHelpOutline } from "react-icons/io5";
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
        }
      });
    }
  }, [currentUser]);

  return (
    <div className="dashboard-home">
      <div className='dashboard-header'>
        {currentUser ? <h1>Welcome, {firstName}!</h1> : <h1>Welcome!</h1>}
        <div className="icon-row">
          <div className="icon-container" onClick={() => navigate('/live-feed')}>
            <FaCog className="icon" />
            <span className="icon-title">Settings</span>
          </div>
          <div className="icon-container" onClick={() => navigate('/live-feed')}>
            <BsCalendar4Event className="icon" />
            <span className="icon-title">Events</span>
          </div>
          <div className="icon-container" onClick={() => navigate('/live-feed')}>
            <IoPhonePortraitOutline className="icon" />
            <span className="icon-title">notifications</span>
          </div>
          <div className="icon-container" onClick={() => navigate('/live-feed')}>
            <IoHelpOutline className="icon" />
            <span className="icon-title">Help</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
