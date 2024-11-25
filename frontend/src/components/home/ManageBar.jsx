import React from 'react';
import { FaPlus } from 'react-icons/fa'; 
import './../../styles/home/ManageBar.css'

// Functional component for the ManageBar (the section with the "Add Recipe" button)
function ManageBar({ontoggleCreateJob}) {
  return (
    <div className='manage-bar-reciepe'>
      <button className='add-reciepe-button' onClick={ontoggleCreateJob}>
        <FaPlus /> Add a recipe
      </button>
    </div>
  );
}

export default ManageBar;
