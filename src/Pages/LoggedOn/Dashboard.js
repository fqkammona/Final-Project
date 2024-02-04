import React from 'react';
import './Dashboard.css';
import { useAuth } from '../../AuthContext'; // Updated the path to go up two levels

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home">
      <div className='header'>
        {currentUser ? <h1>Welcome, {currentUser.email}!</h1> : <h1>Welcome!</h1>}
      </div>
    </div>
  );
};

export default Dashboard;
