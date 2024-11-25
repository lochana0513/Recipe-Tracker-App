import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import axios from 'axios';
import ConfirmationModal from './components/controllers/ConfirmationModal';
import Notification from './components/controllers/Notification';

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  // Function to handle user login
  const handleLogin = (token) => {
    if (token) {
      setIsLoggedIn(true);
    }
  };

  // Function to confirm logout action
  const confirmSignout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update state to reflect that the user is logged out
    setShowConfirmation(false); // Close the confirmation modal
    setNotificationType('success');
    setNotificationMessage('Successfully signed out!');
    setShowNotification(true); // Show notification
  };

  // Function to show confirmation modal for logout
  const handleLogout = () => {
    setShowConfirmation(true);
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    fetchUserData();
    verifyToken();
  }, []);

  // Function to verify if the token stored in localStorage is valid
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/users/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.valid) {
          setIsLoggedIn(true);
          console.log('Token is valid. User ID:', response.data.userId);
        } else {
          setIsLoggedIn(false);
          console.log('Token is invalid.');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      console.log('No token found in localStorage.');
    }
  };

  // Function to fetch user data based on the stored token
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');
  
      // Make an API call to fetch user data
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        // Handle success, for example, updating state with user data
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);    
    }
  };

  // Protect routes and redirect to Login page if not logged in
  const ProtectedRoute = ({ element }) => {
    
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        {/* Show Navbar and Footer only after login */}
        {isLoggedIn && <Navbar onLogout={handleLogout} user={user} />}

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} /> 

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute element={<EditRecipe />} />} />
          <Route path="/view-recipe/:id" element={<ProtectedRoute element={<RecipeDetails />} />} />
        </Routes>

        {/* Show Footer only after login */}
        {isLoggedIn && <Footer />}
      </Router>

      {showConfirmation && (
        <ConfirmationModal
          title="Signout Confirmation"
          message={`Are you sure you want to sign out, ${user?.name || 'User'}?`}
          actionType="update"
          onConfirm={confirmSignout}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {showNotification && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default App;
