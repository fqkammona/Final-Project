import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import './EventsPage.css';

function EventsPage() {
    const [startDate, setStartDate] = useState(new Date());
    const [recognizedObjects, setRecognizedObjects] = useState([]);
    const [eventLabel, setEventLabel] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return unsubscribe;
    }, []);

    const handleDateChange = (date) => setStartDate(date);

    const handleObjectChange = (event) => {
        const { value, checked } = event.target;
        setRecognizedObjects(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleLabelChange = (event) => setEventLabel(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            console.error('No user is logged in!');
            return;
        }

        const eventData = {
            timestamp: serverTimestamp(),
            recognizedObjects,
            label: eventLabel
        };

        try {
            const userEventsRef = collection(db, 'users', user.uid, 'events');
            await addDoc(userEventsRef, eventData);
            alert(`Event scheduled on ${startDate.toLocaleString()}. Thank you!`);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error submitting event: ', error);
        }
    };

    return (
        <div className="events-page-container">
            <form className="events-form" onSubmit={handleSubmit}>
                <div className="events-date-label-box">
                    <label>Event Label:</label>
                    <input
                        type="text"
                        value={eventLabel}
                        onChange={handleLabelChange}
                        className="events-text-input"
                    />
                    <label>Date/Time:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={30}
                        className="events-date-input"
                    />
                </div>
                <CheckBoxSection className="group-box-general-objects" title="General Objects" items={['people', 'cars', 'bicycles', 'trucks', 'cat', 'dog']} onChange={handleObjectChange} />
                <CheckBoxSection className="group-box-people" title="People" items={['Fatima', 'Diego', 'Serena']} onChange={handleObjectChange} />
                <button className="events-submit-btn" type="submit">Submit</button>
            </form>
        </div>
    );
}

const CheckBoxSection = ({ className, title, items, onChange }) => (
    <div className={`events-group-box ${className}`}>
        <h3>{title}</h3>
        {items.map(item => (
            <div key={item} className="events-checkbox-item">
                <input type="checkbox" value={item} onChange={onChange} className="events-checkbox" /> {item}
            </div>
        ))}
    </div>
);

export default EventsPage;
