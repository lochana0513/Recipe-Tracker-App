import React, { useState } from "react";
import loginimg from "./../assets/img/recipe.png";
import './../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  // State hooks for managing input values and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Function for form validation
  const validateForm = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

    // Function to handle login request
    const loginUser = async (email, password) => {
        try {
        const userData = { email, password };
        console.log('Sending data:', userData);
        const response = await axios.post('http://localhost:5000/api/users/login', userData);
    
        // On success, store the token
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.token); // Update state in App component to reflect login success
    
        // Navigate to home after login
        navigate('/');
        } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };
  

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await loginUser(email, password);
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
    }
  };

  // Function to navigate to the signup page
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <h2 className="login-left__title">RecipeLog Login</h2>
          <p className="login-left__description">
            A Recipe Tracker App helps users store and manage their recipes.
          </p>
          <img className="login-left__image" src={loginimg} alt="Management Illustration" />
        </div>

        <div className="login-right">
          <h2 className="login-right__welcome">Welcome Back</h2>
          <p className="login-right__text">Please login to your account</p>
          <form className="login-right__form" onSubmit={handleSubmit}>
            <input
              className="login-right__input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <input
              className="login-right__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}

            <a className="login-right_signup" onClick={handleSignUpClick}>
              Sign up
            </a>
            <button className="login-right__button" type="submit">Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
