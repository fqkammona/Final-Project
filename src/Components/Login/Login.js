import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'; // Email icon
import LoadingPage from '../Login-Loading-Page/LoginLoadingPage'; // Update the path if necessary

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
                // setLoading(false); 
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
            <form onSubmit={handleSubmit} className="login-form">
                <div className='login-title'>Login</div>
                {error && <div className="error">{error}</div>}
                <div className="input-group">
                    <div className="input-with-icon">
                        <MdEmail className="input-icon" />
                        <input
                            name="email"
                            type="text"
                            className="input-field"
                            placeholder="Email"
                            required
                        />
                        <span className='input-box-line'></span>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-with-icon">
                        {passwordVisible ? (
                            <AiFillEyeInvisible className="input-icon" onClick={togglePasswordVisibility} />
                        ) : (
                            <AiFillEye className="input-icon" onClick={togglePasswordVisibility} />
                        )}
                        <input
                            name="password"
                            type={passwordVisible ? "text" : "password"}
                            className="input-field"
                            placeholder="Password"
                            required
                        />
                        <span className='input-box-line'></span>
                    </div>
                </div>
                <button className="login-button" type="submit">Login In</button>
                <button className='sign-up-button' type="button" onClick={() => navigate('/signup')}>Create Account</button>
            </form>
        </div>
    );
};

export default Login;

