import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { useAuth } from '../../AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Settings = ({ userId }) => {
  // States for form fields
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load the current user data from Firestore
  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, 'users', currentUser.uid);
    
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setPhoneNumber(userData.phoneNumber);
          setAddress(userData.address);
        } else {
          setError('No user data found');
        }
      })
      .catch((error) => {
        setError('Error fetching user data: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userRef = doc(db, 'users',  currentUser.uid);

    updateDoc(userRef, {
      firstName,
      lastName,
      email,
      phoneNumber,
      address
    })
    .then(() => {
      alert('Profile updated successfully!');
    })
    .catch((error) => {
      setError('Error updating profile: ' + error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            Update Profile
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Settings;
