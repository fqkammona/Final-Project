import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import './Notifications.css';

function Notifications() {
    const { currentUser } = useAuth();
    const handleButtonClick = () => {
        alert('Fetching notifications...');
    };

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            <button className='notification-button' onClick={handleButtonClick}>Send Text</button>
        </div>
    );
}

export default Notifications;
