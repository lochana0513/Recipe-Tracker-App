const mongoose = require('mongoose');

// Define the Recipe Schema
const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },  // Array of ingredients
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Recipe model
module.exports = mongoose.model('Recipe', RecipeSchema);
