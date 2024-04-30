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
  
          // Fetch address details from sub-collection or fields
          const addressRef = doc(db, 'users', currentUser.uid, 'address', 'primary');
          getDoc(addressRef)
            .then((addrSnap) => {
              if (addrSnap.exists()) {
                setAddressDetails(addrSnap.data());
              }
            })
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
    const addressRef = doc(db, 'users', currentUser.uid, 'address', 'primary');
    const updatedAddressDetails = {
        ...newAddressDetails,
        Update: true  // Set the Update flag to true when updating the address
    };

    try {
      await updateDoc(addressRef, updatedAddressDetails);
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
  
  // Check if the conditions are met to mark as completed
  const isCompleted = personalInfo.phoneNumber !== "Pending Update" && addressDetails.Update;

  try {
    await updateDoc(userRef, {
      ...personalInfo,
      completed: isCompleted // Update the main user profile with the potentially new completed status
    });
    await handleAddressUpdate(addressDetails, isCompleted); // Pass the isCompleted status to the address update
    console.log('Profile updated successfully!');
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    setError('Error updating profile: ' + error.message);
  } finally {
    setLoading(false);
  }
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
