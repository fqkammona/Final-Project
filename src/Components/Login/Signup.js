import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io'; // House icon
import { MdEmail } from 'react-icons/md'; // Email icon
import { FaMobileAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa'; // Person icon
import { AiFillEye } from 'react-icons/ai';

import './Signup.css';
import LoadingPage from '../Login-Loading-Page/LoginLoadingPage'; // Update the path if necessary

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
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
            <FaMobileAlt className="input-icon" />
            <input
              id="phoneNumber"
              type="text"
              className="input-field"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <div className="input-group">
          <div className="input-with-icon">
            <IoMdHome className="input-icon" />
            <input
              id="address"
              type="text"
              className="input-field"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <div className="input-group">
          <div className="input-with-icon">
            <AiFillEye className="input-icon" />
            <input
              id="password"
              type="text"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='input-box-line'></span>
          </div>
        </div>
        <button className="signup-botton" type="submit" disabled={loading}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
