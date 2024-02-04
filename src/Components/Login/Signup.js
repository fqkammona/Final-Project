import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import LoadingPage from '../LoadingPage/LoginLoadingPage'; // Make sure the path is correct

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Wait for 5 seconds before navigating
      setTimeout(() => {
        navigate('/dashboard', { state: { email: userCredential.user.email } });
      }, 5000); // Delay for 5 seconds
    } catch (error) {
      console.error(error);
      alert(error.message); // Optionally handle the error state
      setLoading(false); // Stop loading on error
    }
  };
  
  // If loading, render the LoadingPage instead of the signup form
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className='signup-page'>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
