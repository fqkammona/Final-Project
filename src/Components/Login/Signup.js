import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md'; // Email icon
import { FaUser } from 'react-icons/fa'; // Person icon
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

import './Signup.css';
import LoadingPage from '../Login-Loading-Page/LoginLoadingPage'; // Update the path if necessary

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Simple password validation
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      alert("Password must be at least 8 characters long and include both letters and numbers.");
      setLoading(false);
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set default values for phoneNumber, address, and add 'Completed' as false
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
        phoneNumber: "Pending Update", // Default or entered value
        address:  "Pending Update", 
        completed: false  // Initial value set to false
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
        <div className="title">New Account?</div>
        <div className="input-group">
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              id="firstName"
              type="text"
              className="input-field"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <div className="input-group">
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              id="lastName"
              type="text"
              className="input-field"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <div className="input-group">
          <div className="input-with-icon">
            <MdEmail className="input-icon" />
            <input
              id="email"
              type="text"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <div className="input-group">
          <div className="input-with-icon">
            {passwordVisible ? (
              <FaLockOpen className="input-icon" onClick={togglePasswordVisibility} />
            ) : (
              <FaLock className="input-icon" onClick={togglePasswordVisibility} />
            )}
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <div className="input-group">
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              id="confirmPassword"
              type="password"
              className="input-field"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <button className="signup-button" type="submit" disabled={loading}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
