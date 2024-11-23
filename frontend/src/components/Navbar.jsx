import React from 'react';
import './../styles/Navbar.css';  // Import external CSS file
import logo from "./../assets/img/RecipeLog-logo.png";

function Navbar() {
  const handleSignOut = () => {
    // Sign-out logic 
    console.log('User signed out');
  };

  return (
    <div className="navbar">
      {/* Container for Logo */}
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      
      {/* Container for Sign-out Button */}
      <div className="navbar-right">
        <button className="sign-out" onClick={handleSignOut}>
        Refresh page
        </button>

        <button className="sign-out" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
