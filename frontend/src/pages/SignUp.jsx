import React, { useState } from "react";
import signUpImg from "./../assets/img/recipe.png"; // You can use an image for signup like login image
import './../styles/Signup.css'; // Create a separate CSS file for the SignUp page
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn'; // Import zxcvbn for password strength evaluation
import axios from 'axios'; // Import axios for API calls

function SignUp() {
  // State to manage form inputs and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(null); // State for password strength
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['#ff4d4d', '#ffb84d', '#ffff4d', '#4dff4d', '#4d88ff'];

  // Form validation function
  const validateForm = () => {
    let valid = true;

    // Name validation
    if (!name.trim()) {
      setNameError('Name is required.');
      valid = false;
    } else {
      setNameError('');
    }

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

// SignUp API call function
  const signupUser = async (name, email, password) => {
    try {
        const userData = { name, email, password };
        console.log('Sending data:', userData); // Log the data before sending
        const response = await axios.post('http://localhost:5000/api/users', userData);
        console.log('User registered successfully:', response.data);
        navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error during signup:', error);
        setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };


    // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (validateForm()) {
      // Call the signup function if form is valid
      await signupUser(name, email, password);

      // Clear form fields after successful signup
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handlePassword = (e) => {
    const newPasswordValue = e.target.value;
    setPassword(newPasswordValue);

    const strength = zxcvbn(newPasswordValue);
    setPasswordStrength(strength);
  };

  const renderPasswordStrength = () => {
    if (!passwordStrength) return null;

    const score = passwordStrength.score;
    const suggestions = passwordStrength.feedback.suggestions.join(', ');

    return (
      <div className="password-strength-container">
        <p>Password strength: <strong>{strengthLabel[score]}</strong></p>
        <div style={{
          width: '100%', height: '5px', backgroundColor: '#e0e0e0', borderRadius: '5px',
          marginTop: '5px', marginBottom: '10px'
        }}>
          <div style={{
            width: `${(score + 1) * 20}%`, height: '100%', backgroundColor: strengthColors[score],
            borderRadius: '5px'
          }} />
        </div>
        {suggestions && <p>Suggestions: {suggestions}</p>}
      </div>
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Left Section */}
        <div className="signup-left">
          <h2 className="signup-left__title">RecipeLog Signup</h2>
          <p className="signup-left__description">
            Join RecipeLog to track and manage your favorite recipes.
          </p>
          <img className="signup-left__image" src={signUpImg} alt="Signup Illustration" />
        </div>

        {/* Right Section */}
        <div className="signup-right">
          <h2 className="signup-right__welcome">Create Your Account</h2>
          <p className="signup-right__text">Please fill in the details to sign up</p>
          <form className="signup-right__form" onSubmit={handleSubmit}>
            <input
              className="signup-right__input"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="error-message">{nameError}</p>}

            <input
              className="signup-right__input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <input
              className="signup-right__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword} // Use handlePassword to track password strength
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            {renderPasswordStrength()} {/* Render password strength */}

            <button className="signup-right__button" type="submit" onClick={handleSubmit}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
