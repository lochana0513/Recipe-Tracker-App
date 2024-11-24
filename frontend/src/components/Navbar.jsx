import React from 'react';
import './../styles/Navbar.css';  // Import external CSS file
import logo from "./../assets/img/RecipeLog-logo.png";

function Navbar({onLogout }) {

  const refresh = () => {
    // Refresh the current page
    window.location.reload();
  };

  return (
    <div className="navbar">
      {/* Container for Logo */}
      <div className="navbar-left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      
      {/* Container for Sign-out and Refresh Button */}
      <div className="navbar-right">
        <button className="nav-button refresh-page" onClick={refresh}>
          Refresh page
        </button>

        <button className="nav-button sign-out" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
