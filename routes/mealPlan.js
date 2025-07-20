const express = require("express");
const mongoose = require("mongoose");
const MealPlan = require("../models/MealPlan.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Get user's meal plan
router.get("/", auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { user: req.user._id };

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const mealPlan = await MealPlan.find(query)
      .populate("recipe")
      .sort({ date: 1, mealType: 1 });

    res.json(mealPlan);
  } catch (error) {
    console.error("Get meal plan error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add meal to plan
router.post("/", auth, async (req, res) => {
  try {
    const { date, mealType, recipeId, servings } = req.body;

    const mealPlanEntry = new MealPlan({
      user: req.user._id,
      date,
      mealType,
      recipe: recipeId,
      servings,
    });

    await mealPlanEntry.save();
    await mealPlanEntry.populate("recipe");

    res.status(201).json(mealPlanEntry);
  } catch (error) {
    console.error("Add meal to plan error:", error);
    res.status(500).json({ message: "Server error", error: error });
  }
});

// Update meal in plan
router.put("/:id", auth, async (req, res) => {
  try {
    const mealPlanEntry = await MealPlan.findById(req.params.id);

    if (!mealPlanEntry) {
      return res.status(404).json({ message: "Meal plan entry not found" });
    }

    // Check if user owns the meal plan entry
    if (mealPlanEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedEntry = await MealPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("recipe");

    res.json(updatedEntry);
  } catch (error) {
    console.error("Update meal plan error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove meal from plan
router.delete("/:id", auth, async (req, res) => {
  try {
    const mealPlanEntry = await MealPlan.findById(req.params.id);

    if (!mealPlanEntry) {
      return res.status(404).json({ message: "Meal plan entry not found" });
    }

    // Check if user owns the meal plan entry
    if (mealPlanEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal removed from plan successfully" });
  } catch (error) {
    console.error("Remove meal from plan error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
