import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = (token) => {
    if (token) {
      setIsLoggedIn(true);
    }
  };

    // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setIsLoggedIn(false);  // Update state to reflect that the user is logged out
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Protect routes and redirect to Login page if not logged in
  const ProtectedRoute = ({ element }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return element;
  };

  return (
    <div className="App">
      <Router>
        {/* Show Navbar and Footer only after login */}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}

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
    </div>
  );
}

export default App;
