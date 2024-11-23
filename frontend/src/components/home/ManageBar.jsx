import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the icon you want to use
import './../../styles/home/ManageBar.css'

function ManageBar({ontoggleCreateJob}) {
  return (
    <div className='manage-bar-reciepe'>
      <button className='add-reciepe-button' onClick={ontoggleCreateJob}>
        <FaPlus /> Add Recipe
      </button>
    </div>
  );
}

export default ManageBar;
