// Components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Modify the .then() block in the handleSubmit function
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Navigate to the dashboard upon successful login
            navigate('/dashboard', { state: { email: email } });
          })
          .catch((error) => {
            // Handle errors here based on error.code
            setError('Login failed. Please try again.');
          });
    };

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
