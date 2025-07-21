import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MealPlanContext = createContext();

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error("useMealPlan must be used within a MealPlanProvider");
  }
  return context;
};

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecipes();
    fetchMealPlan();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recipes`
      );
      const data = response.data;

      const safeRecipes = Array.isArray(data) ? data : data.recipes || [];

      setRecipes(safeRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  const fetchMealPlan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/meal-plan`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.mealPlan || [];

      setMealPlan(data);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      setMealPlan([]);
    }
  };

  const addMealToPlan = async (date, mealType, recipe, servings) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/meal-plan`,
        {
          date,
          mealType,
          recipeId: recipe._id,
          servings,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMealPlan((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding meal to plan:", error);
    }
  };

  const removeMealFromPlan = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/meal-plan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMealPlan((prev) => prev.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error removing meal from plan:", error);
    }
  };

  const updateMealServings = async (id, servings) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/meal-plan/${id}`,
        { servings }
      );
      setMealPlan((prev) =>
        prev.map((entry) => (entry._id === id ? response.data : entry))
      );
    } catch (error) {
      console.error("Error updating meal servings:", error);
    }
  };

  const searchRecipes = (query, filters) => {
    let filtered = recipes;

    if (query) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(query.toLowerCase()) ||
          recipe.dietaryTags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    if (filters.difficulty) {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === filters.difficulty
      );
    }

    if (filters.cuisine) {
      filtered = filtered.filter(
        (recipe) => recipe.cuisine === filters.cuisine
      );
    }

    if (filters.dietaryTags && filters.dietaryTags.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.dietaryTags.some((tag) => recipe.dietaryTags.includes(tag))
      );
    }

    return filtered;
  };

  const getDayNutrition = () => {
    const dayMap = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    // Initialize map
    const weekStats = {
      Sunday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      Monday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      Tuesday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      Wednesday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      Thursday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      Friday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      Saturday: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    };

    mealPlan.forEach((meal) => {
      const day = dayMap[new Date(meal.date).getDay()];
      const multiplier = meal.servings / meal.recipe.servings;

      weekStats[day].calories += meal.recipe.nutrition.calories * multiplier;
      weekStats[day].protein += meal.recipe.nutrition.protein * multiplier;
      weekStats[day].carbs += meal.recipe.nutrition.carbs * multiplier;
      weekStats[day].fat += meal.recipe.nutrition.fat * multiplier;
    });

    return Object.entries(weekStats).map(([day, stats]) => ({
      day,
      ...stats,
    }));
  };

  const getNutritionByDay = (dayName) => {
    const filtered = mealPlan.filter(
      (meal) =>
        new Date(meal.date).toLocaleDateString("en-US", {
          weekday: "long",
        }) === dayName
    );

    return filtered.reduce(
      (acc, meal) => {
        if (!meal.recipe || !meal.recipe.nutrition || !meal.recipe.servings)
          return acc;

        const ratio = meal.servings / meal.recipe.servings;
        acc.calories += meal.recipe.nutrition.calories * ratio;
        acc.protein += meal.recipe.nutrition.protein * ratio;
        acc.carbs += meal.recipe.nutrition.carbs * ratio;
        acc.fat += meal.recipe.nutrition.fat * ratio;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <MealPlanContext.Provider
      value={{
        mealPlan,
        recipes,
        loading,
        addMealToPlan,
        removeMealFromPlan,
        updateMealServings,
        searchRecipes,
        getDayNutrition,
        fetchRecipes,
        fetchMealPlan,
        getNutritionByDay,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};
