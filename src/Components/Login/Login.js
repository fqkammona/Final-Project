import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import LoadingPage from '../LoadingPage/LoginLoadingPage'; // Update the path if necessary

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); // New state for loading

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Start loading
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // setLoading(false); // You could stop loading here or let the LoadingPage handle the navigation
            // navigate('/dashboard', { state: { email: email } });
          })
          .catch((error) => {
            setLoading(false); // Stop loading and show error
            setError('Login failed. Please try again.');
          });
    };

    // If loading, render the LoadingPage instead of the login form
    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <input name="email" type="text" placeholder="Email" required />
                <div className="password-container">
                    <input
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                        {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>
                <button className='buttons-options' type="submit">Login</button>
                <button className='buttons-options' type="button" onClick={() => navigate('/signup')}>Create Account</button>
            </form>
        </div>
    );
};

export default Login;
