import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../../firebase-config';
import './EventsPage.css'; // Make sure to import the CSS

function EventsPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [recognizedObjects, setRecognizedObjects] = useState([]);
  const [eventLabel, setEventLabel] = useState(''); // State for the event label
  const [user, setUser] = useState(null); // State to track the authenticated user
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set the user or null if not logged in
    });
    return () => unsubscribe();
  }, []);

  const generalObjects = ['people', 'cars', 'bicycles', 'trucks', 'cat', 'dog'];
  const recognizedPeople = ['Fatima', 'Diego', 'Serena'];

  const handleDateChange = date => {
    setStartDate(date);
  };

  const handleObjectChange = event => {
    const { value, checked } = event.target;
    setRecognizedObjects(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleLabelChange = event => {
    setEventLabel(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      console.error('No user is logged in!');
      return;
    }

    const eventData = {
      timestamp: serverTimestamp(),
      recognizedObjects, // Include recognized objects
      label: eventLabel // Include the label for the event
    };

    try {
      const userEventsRef = collection(db, 'users', user.uid, 'events');
      const docRef = await addDoc(userEventsRef, eventData);
      console.log('Event submitted successfully, document ID:', docRef.id);
      navigate('/some-success-page'); // Uncomment to navigate after submission
    } catch (error) {
      console.error('Error submitting event: ', error);
    }
  };

  return (
    <form className="events-form" onSubmit={handleSubmit}>
      <div className="events-date-picker">
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
      <div className="events-group-box">
        <h3>General Objects</h3>
        {generalObjects.map(obj => (
          <div key={obj} className="events-checkbox-item">
            <input
              type="checkbox"
              value={obj}
              onChange={handleObjectChange}
              className="events-checkbox"
            /> {obj}
          </div>
        ))}
      </div>
      <div className="events-group-box">
        <h3>People</h3>
        {recognizedPeople.map(person => (
          <div key={person} className="events-checkbox-item">
            <input
              type="checkbox"
              value={person}
              onChange={handleObjectChange}
              className="events-checkbox"
            /> {person}
          </div>
        ))}
      </div>
      <div className="events-label-input">
        <label>Event Label:</label>
        <input
          type="text"
          value={eventLabel}
          onChange={handleLabelChange}
          className="events-text-input"
        />
      </div>
      <button className="events-submit-btn" type="submit">Submit</button>
    </form>
  );
}

export default EventsPage;
