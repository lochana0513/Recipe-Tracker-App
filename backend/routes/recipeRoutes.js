const express = require('express');
const Recipe = require('../models/Recipe');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new recipe
router.post('/', authMiddleware, async (req, res) => {
    console.log('User info from token:', req.user); // Should log the user object
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    try {
        const { name, description, ingredients } = req.body;

        if (!name || !description || !ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Missing required fields or empty ingredients array' });
        }

        const newRecipe = new Recipe({
            name,
            description,
            ingredients,
            userid: req.user.id, // Ensure req.user.id exists
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the recipe' });
    }
});

// Get a recipes by User
router.get('/', authMiddleware, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User ID missing' });
        }

        // Find recipes by user ID
        const recipes = await Recipe.find({ userid: req.user.id });

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this user' });
        }

        res.status(200).json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching recipes' });
    }
});

// Get a recipe by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const recipeId = req.params.id;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User ID missing' });
        }

        // Find the recipe by ID and ensure it belongs to the authenticated user
        const recipe = await Recipe.findOne({ _id: recipeId, userid: req.user.id });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (err) {
        console.error(err);

        // Check if the error is due to an invalid ObjectId
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }

        res.status(500).json({ message: 'An error occurred while fetching the recipe' });
    }
});


// Update a recipe by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updates = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User ID missing' });
        }

        // Find the recipe by ID and ensure it belongs to the authenticated user
        const recipe = await Recipe.findOneAndUpdate(
            { _id: recipeId, userid: req.user.id }, // Match the recipe with the user's ID
            { $set: updates }, // Apply the updates
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found or unauthorized to update' });
        }

        res.status(200).json({
            message: 'Recipe updated successfully',
            recipe,
        });
    } catch (err) {
        console.error(err);

        // Handle Mongoose ObjectId error explicitly
        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid recipe ID format' });
        }

        res.status(500).json({ message: 'An error occurred while updating the recipe' });
    }
});

// Delete a recipe by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const recipeId = req.params.id;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User ID missing' });
        }

        // Find and delete the recipe, ensuring it belongs to the authenticated user
        const recipe = await Recipe.findOneAndDelete({ _id: recipeId, userid: req.user.id });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found or unauthorized to delete' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error(err);

        // Check if the error is due to an invalid ObjectId
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid recipe ID' });
        }

        res.status(500).json({ message: 'An error occurred while deleting the recipe' });
    }
});


module.exports = router;
