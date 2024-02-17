import LoadingPage from '../LoadingPage/LoginLoadingPage'; // Make sure the path is correct
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import { auth, db } from '../../firebase-config'; // Make sure you're importing db
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // Added state for first name
  const [lastName, setLastName] = useState(''); // Added state for last name
  const [phoneNumber, setPhoneNumber] = useState(''); // Added state for phone number
  const [address, setAddress] = useState(''); // Added state for address
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
        phoneNumber,
        address
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className='signup-page'>
      <form onSubmit={handleSubmit} className="signup-form">
        <label className='input-label'>First Name</label>
        <input type="text" placeholder="Girl" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <label className='input-label'>Last Name</label>
        <input type="text" placeholder="Coded" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <label className='input-label'>Email</label>
        <input type="email" placeholder="girl_coded@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label className='input-label'>Phone Number</label>
        <input type="tel" placeholder="(678) 999-8212" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <label className='input-label'>Address</label>
        <input type="text" placeholder="3100 Seamans Center, Iowa City, IA 52242" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label className='input-label'>Password</label>
        <input type="password" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
