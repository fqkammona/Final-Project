import React from 'react';
import { FaCamera } from "react-icons/fa6";
import './NotificationMessage.css'; 

const NotificationMessage = ({ message = "Default Message" }) => {
    return (
        <div className="notification-box">
            <div className="notification-icon"><FaCamera /></div>
            <div className="notification-info">
                <div className="notification-sender">GIRL C0DED</div>
                <div className="notification-message">{message}</div>
            </div>
        </div>
    );
};

export default NotificationMessage;
