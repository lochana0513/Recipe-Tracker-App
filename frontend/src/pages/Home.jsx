import React, { useState, useEffect } from 'react';
import ManageBar from '../components/home/ManageBar';
import Herosection from '../components/home/Herosection';
import Popup from '../components/controllers/Popup';
import RecipeContainer from '../components/home/RecipeContainer';
import AddRecipe from '../components/home/AddRecipe';
import axios from 'axios';
import Notification from './../components/controllers/Notification';

function Home() {
  const [recipes, setRecipes] = useState([]);
  // States for controlling notification
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  // State to track the visibility of the Add Recipe popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => setIsPopupOpen(true);
  // Function to close the popup
  const closePopup = () => setIsPopupOpen(false);

  // Function to trigger notifications (success/error)
  const triggerNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  // Function to confirm and delete a recipe
  const confirmDelete = async (recipeToDelete) => {
    if (recipeToDelete !== null) {
      try {
        // Make the API call to delete the recipe
        const response = await axios.delete(`http://localhost:5000/api/recipes/${recipeToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed for auth
          },
        });
  
        if (response.status === 200) {
          // If deletion was successful, update the state
          
          triggerNotification('success', 'Recipe deleted successfully!');
          fetchRecipes();
        } else {
          triggerNotification('error', `Failed to delete recipe: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        triggerNotification('error', `Failed to delete recipe: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Fetch recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to fetch recipes from the server
  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');
  
      const response = await axios.get('http://localhost:5000/api/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        // If recipes are found, set the recipes state
        setRecipes(response.data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      
      if (error.response?.status === 404) {
        // If the server responds with a 404 error (No recipes found)
        setRecipes([]);  // Set recipes state to an empty array
      } else {
        const message = error.response?.data?.message || 'Failed to fetch recipes.';
        triggerNotification('error', message); // Trigger notification for other errors
      }
    }
  };
  

  // Function to add a new recipe
  const addRecipe = async (newRecipe) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await axios.post(
        'http://localhost:5000/api/recipes',
        newRecipe,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        const addedRecipe = { ...newRecipe, id: response.data._id };
        setRecipes((prevRecipes) => [...prevRecipes, addedRecipe]);
        triggerNotification('success', 'Recipe added successfully!');
        fetchRecipes();
        closePopup();
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      const message = error.response?.data?.message || 'Failed to add recipe.';
      triggerNotification('error', message);
    }
  };

  return (
    <div>
      <section>
        <Herosection />
      </section>
      <section>
        <ManageBar ontoggleCreateJob={openPopup} />
        {isPopupOpen && (
          <Popup onClose={closePopup}>
            <AddRecipe onAddRecipe={addRecipe} onNotify={triggerNotification} />
          </Popup>
        )}
        <RecipeContainer
          recipes={recipes}
          setRecipes={setRecipes}
          onConfirmDelete={confirmDelete}
          onNotify={triggerNotification}
        />
      </section>

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

export default Home;
