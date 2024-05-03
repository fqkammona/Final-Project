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
          const addressRef = doc(db, 'users', currentUser.uid, 'address', 'primary');
          getDoc(addressRef)
            .then((addrSnap) => {
              if (addrSnap.exists()) {
                setAddressDetails(addrSnap.data());
              }
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
    const addressRef = doc(db, 'users', currentUser.uid, 'address', 'primary');
    const isAddressComplete = Object.values(newAddressDetails).every(value => value !== '');
    
    const updatedAddressDetails = {
      ...newAddressDetails,
      Update: isAddressComplete  // Set the Update flag based on whether all address fields are filled
    };
  
    try {
      await updateDoc(addressRef, updatedAddressDetails);
      console.log('Address updated successfully!');
      await handleCompleteUpdate(isAddressComplete);  // Handle updating the Complete flag
    } catch (error) {
      console.error('Error updating address:', error);
      setError('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCompleteUpdate = async (isAddressComplete) => {
    const userRef = doc(db, 'users', currentUser.uid);
    const userInfoSnap = await getDoc(userRef);
    if (userInfoSnap.exists()) {
      const userInfo = userInfoSnap.data();
      const isPhoneReady = userInfo.phoneNumber !== 'Pending Update';
      const completedStatus = isAddressComplete && isPhoneReady;
  
      try {
        await updateDoc(userRef, { completed: completedStatus });  // Update the 'completed' field
        if (completedStatus) {
          console.log('Profile marked as completed.');
        }
      } catch (error) {
        console.error('Error updating completed status:', error);
        setError('Error updating completed status: ' + error.message);
      }
    }
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const userRef = doc(db, 'users', currentUser.uid);
    try {
      await updateDoc(userRef, personalInfo);
      await handleAddressUpdate(addressDetails);  
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
        <form onSubmit={handleSubmit} className="settings-container">
          <div className="personal-details-container">
            <div className="header-row">
              <div className="address-title">Personal Details</div>
            </div>
            <div className="input-row">
              <div className="input-address">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  className="address-field"
                  value={personalInfo.firstName}
                  onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                />
              </div>
              <div className="input-address">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  className="address-field"
                  value={personalInfo.lastName}
                  onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-address">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="address-field"
                  value={personalInfo.email}
                  onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
              </div>
              <div className="input-address">
                <label className="input-label">Phone Number</label>
                <input
                  type="tel"
                  className="address-field"
                  value={personalInfo.phoneNumber}
                  onChange={e => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
                />
              </div>
            </div>
          </div>
          <AddressDetails
            addressDetails={addressDetails}
            setAddressDetails={setAddressDetails}
          />
          <div className="button-setting-container">
            <button className='update-settings-button' type="submit">Update Profile</button>
            {error && <p className="error">{error}</p>}
          </div>

        </form>
      )}
    </div>


  );
};

export default Settings;
