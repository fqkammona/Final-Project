import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import './EventsPage.css';

function EventsPage() {
    const [startDate, setStartDate] = useState(new Date());
    const [recognizedObjects, setRecognizedObjects] = useState([]);
    const [eventLabel, setEventLabel] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [minDate, setMinDate] = useState(new Date(Date.now() + 30 * 60000));
    const [userProfile, setUserProfile] = useState({ address: '', phoneNumber: '' });
    const [showUpdateWarning, setShowUpdateWarning] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                navigate('/login'); // Redirect to login if not authenticated
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        // Assuming 'completed' is a boolean field in userProfile indicating if the profile is fully updated
        const needsUpdate = !userProfile.completed;
        setShowUpdateWarning(needsUpdate);
    
        setIsFormValid(
            eventLabel.trim() !== '' &&
            startDate >= minDate &&
            recognizedObjects.length > 0 &&
            !needsUpdate
        );
    }, [eventLabel, startDate, recognizedObjects, minDate, userProfile]);
    

    useEffect(() => {
        const timer = setInterval(() => {
            setMinDate(new Date(Date.now() + 30 * 60000));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserProfile(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            };
            fetchUserData();
        }
    }, [user]);

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

        if (!isFormValid) {
            console.error('The form is not valid!');
            return;
        }

        const eventData = {
            timestamp: startDate,
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
            {showUpdateWarning && (
                <div className="update-warning">
                    <p>
                        Your address or phone number requires updating. Please
                        <button onClick={() => navigate('/settings')} className="update-link-button"> click here </button>
                        to update your profile.
                    </p>
                </div>
            )}
            <form className="events-form" onSubmit={handleSubmit}>
            <h1 className="events-page-title">Events Form</h1>
            <div className="requirements-box">
                <p>Please ensure all fields are properly filled:</p>
                <ul>
                    <li>Enter a valid event label</li>
                    <li>Select a future date and time (at least 30 minutes ahead)</li>
                    <li>Select at least one object from the checkboxes below</li>
                </ul>
            </div>
            <div className="form-content">
                <div className="events-group-box information-box">
                    <h3>Information</h3>
                    <div className="input-wrapper">
                        <label className="input-label">Event Label:</label>
                        <input
                            type="text"
                            value={eventLabel}
                            onChange={handleLabelChange}
                            className="events-text-input"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label className="input-label">Date/Time:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                            timeIntervals={30}
                            minDate={minDate}
                            className="events-date-input"
                        />
                    </div>
                    </div>
                    <CheckBoxSection className="group-box-general-objects" title="General Objects" items={['People', 'Cars', 'Bicycles', 'Trucks', 'Cat', 'Dog']} onChange={handleObjectChange} />
                    <CheckBoxSection className="group-box-people" title="People" items={['Fatima', 'Diego', 'Sirena']} onChange={handleObjectChange} />
                </div>
                <input
                    type="submit"
                    value="Submit"
                    className="submit-button"
                    disabled={!isFormValid}
                />
            </form>
        </div>
    );
}

const CheckBoxSection = ({ className, title, items, onChange }) => (
    <div className={`events-group-box ${className}`}>
        <h3>{title}</h3>
        {items.map(item => (
            <label key={item} className="events-checkbox-item">
                <span className="events-checkbox-label">{item}</span>
                <input
                    type="checkbox"
                    value={item}
                    onChange={onChange}
                    className="events-checkbox"
                />
            </label>
        ))}
    </div>
);

export default EventsPage;
