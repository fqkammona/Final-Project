import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaCog } from 'react-icons/fa'; // Import the settings icon

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="home">
      <div className='header'>
        {currentUser ? <h1>Welcome, {currentUser.email}!</h1> : <h1>Welcome!</h1>}
        <FaCog onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }} /> {/* Add the settings icon */}
      </div>
    </div>
  );
};

export default Dashboard;
