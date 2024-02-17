import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaCog } from 'react-icons/fa'; // Import the settings icon
import { db } from '../../firebase-config'; // Make sure this path is correct
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
    <div className="home">
      <div className='header'>
        {currentUser ? <h1>Welcome, {firstName}!</h1> : <h1>Welcome!</h1>}
        <FaCog onClick={() => navigate('/our-story')} style={{ cursor: 'pointer' }} /> {/* Add the settings icon */}
      </div>
    </div>
  );
};

export default Dashboard;
