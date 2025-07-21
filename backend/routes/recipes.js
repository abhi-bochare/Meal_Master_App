const express = require("express");
const Recipe = require("../models/Recipe.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "name");
    res.json(recipes);
  } catch (error) {
    console.error("Get recipes error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Get recipe error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new recipe
router.post("/", auth, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      createdBy: req.user._id,
    });

    await recipe.save();
    await recipe.populate("createdBy", "name");

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Create recipe error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update recipe
router.put("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if user owns the recipe or is admin
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("createdBy", "name");

    res.json(updatedRecipe);
  } catch (error) {
    console.error("Update recipe error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete recipe
router.delete("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if user owns the recipe or is admin
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete recipe error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
