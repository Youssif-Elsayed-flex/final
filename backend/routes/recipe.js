const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/RecipeSchema');

// get all recipe 
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.status(200).json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
// get single recipe 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Recipe ID format' });
    }
    try {
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        res.status(200).json(recipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

// create recipe route
router.post('/', async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: 'All Fields Are required' });
        }
        const newRecipe = await Recipe.create({
            title, ingredients, instructions
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Server error while creating recipe' });
    }
})

// update recipe
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Recipe ID format' });
    }
    const { title, ingredients, instructions } = req.body;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, {
            title,
            ingredients,
            instructions
        }, { new: true, runValidators: true })
        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        res.status(200).json(updatedRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

// delete recipe
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Recipe ID format' });
    }
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ error: 'internal server error' });
    }
})



module.exports = router;   