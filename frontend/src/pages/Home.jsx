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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const triggerNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

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
          fetchRecipes();
          triggerNotification('success', 'Recipe deleted successfully!');
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

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await axios.get('http://localhost:5000/api/recipes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setRecipes(response.data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      const message = error.response?.data?.message || 'Failed to fetch recipes.';
      triggerNotification('error', message);
    }
  };


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
