import React from 'react';
import { FaHeart } from "react-icons/fa";
import './NotificationMessage.css'; 

const NotificationMessage = ({ message = "Default Message" }) => {
    return (
        <div className="notification-box">
            <div className="notification-icon"><FaHeart /></div>
            <div className="notification-info">
                <div className="notification-sender">GIRL C0DED</div>
                <div className="notification-message">{message}</div>
            </div>
        </div>
    );
};

export default NotificationMessage;
