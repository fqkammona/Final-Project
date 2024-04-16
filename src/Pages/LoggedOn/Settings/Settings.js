import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { useAuth } from '../../../AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Settings.css';
import AddressDetails from './AddressDetails';

const Settings = () => {
  const { currentUser } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [addressDetails, setAddressDetails] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, 'users', currentUser.uid);
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPersonalInfo({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber
          });
          const addressParts = data.address ? data.address.split(', ') : [];
          setAddressDetails({
            address: addressParts[0] || '',
            city: addressParts[1] || '',
            state: addressParts[2] || '',
            postalCode: addressParts[3] || '',
            country: addressParts[4] || ''
          });
        } else {
          setError('No user data found');
        }
      })
      .catch(error => {
        setError('Error fetching user data: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser]);

  const handleAddressUpdate = async (newAddressDetails) => {
    setLoading(true);
    const userRef = doc(db, 'users', currentUser.uid);
    const fullAddress = `${newAddressDetails.address}, ${newAddressDetails.city}, ${newAddressDetails.state}, ${newAddressDetails.postalCode}, ${newAddressDetails.country}`;
    try {
      await updateDoc(userRef, { address: fullAddress });
      console.log('Address updated successfully!');
    } catch (error) {
      console.error('Error updating address:', error);
      setError('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userRef = doc(db, 'users', currentUser.uid);
    const fullAddress = `${addressDetails.address}, ${addressDetails.city}, ${addressDetails.state}, ${addressDetails.postalCode}, ${addressDetails.country}`;
    updateDoc(userRef, {
      ...personalInfo,
      address: fullAddress
    })
      .then(() => {
        alert('Profile updated successfully!');
      })
      .catch(error => {
        setError('Error updating profile: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='settings-page'>
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}

            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
     
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
        
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              value={personalInfo.phoneNumber}
              onChange={e => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
              
            />
          </div>
          <AddressDetails
            addressDetails={addressDetails}
            setAddressDetails={setAddressDetails}
            onUpdate={handleAddressUpdate}
          />
      
          <button type="submit" >
            Update Profile
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Settings;
