import React from 'react';
import './Dashboard.css';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const userEmail = location.state?.email;

  return (
    <div className="home">
      <div className='header'>
        {userEmail ? <h1>Welcome, {userEmail}!</h1> : <h1>Welcome!</h1>}
      </div>
    </div>
  );
};


export default Dashboard;
