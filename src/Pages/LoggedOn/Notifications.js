import React from 'react';
import { useAuth } from '../../AuthContext';
import './Notifications.css';
import { getFunctions } from 'firebase/functions';

function Notifications() {
    const { currentUser } = useAuth();

    const handleButtonClick = async () => {
        if (!currentUser) {
            alert('You must be logged in to send a text.');
            return;
        }

        const token = await currentUser.getIdToken();  // Get the Firebase ID token

        const url = 'https://us-central1-girl-c0ded.cloudfunctions.net/sendTextMessage';
        const data = { text: 'Hi Me' };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the ID token in the Authorization header
            },
            body: JSON.stringify(data)
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log('Message sent:', data);
                alert('Message sent successfully!');
            })
            .catch(error => {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again.');
            });
    };

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            <button className='notification-button' onClick={handleButtonClick}>Send Text</button>
        </div>
    );
}

export default Notifications;
