import React, { useState, useEffect, useRef } from 'react';
import './Timeline.css';
import NotificationMessage from './NotificationMessage';

const Timeline = () => {
    const [showEventBox, setShowEventBox] = useState(false);
    const [showNotificationBox, setShowNotificationBox] = useState(false);
    const [activeNotifications, setActiveNotifications] = useState([]);
    const notificationRef = useRef(null);
    const notifications = ["Diego has arrived at home!", "IT'S JUST THAT SIMPLE!"];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setShowEventBox(true);
                            // Delay the notification box to show 1 second after the event box
                            setTimeout(() => {
                                setShowNotificationBox(true);
                            }, 1000);
                        }, 300);
                        observer.disconnect();  // Disconnect observer after triggering
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (notificationRef.current) {
            observer.observe(notificationRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (showNotificationBox) {
            notifications.forEach((message, index) => {
                setTimeout(() => {
                    setActiveNotifications(notifs => [...notifs, message]);
                }, 1000 * (index + 1)); // Delay each notification by 1 second incrementally
            });
        }
    }, [showNotificationBox]);

    return (
        <div className='timeline-page' ref={notificationRef}>
            {showEventBox && (
                <div className="event-box-display fade-in">
                    <h2 className="event-title">1st Schedule an Event</h2>
                    <div className="mock-alert">
                        <div className="mock-alert-content">
                            <p>Event scheduled on 4/25/2024, 3:00:00 PM. Thank you!</p>
                            <button className="mock-alert-ok-button">OK</button>
                        </div>
                    </div>
                </div>
            )}
            {showNotificationBox && (
                <div className="notification-box-display fade-in">
                    <h2 className="notification-title">Receive a text when the event happens</h2>
                    {activeNotifications.map((message, index) => (
                        <div key={index} className="notification-fade-in">
                            <div className='notification-message-box'>
                                <NotificationMessage message={message} />
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Timeline;
