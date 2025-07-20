import React, { useState } from 'react';
import { Calendar, Plus, X, Clock, Users } from 'lucide-react';
import { useMealPlan } from '../contexts/MealPlanContext';

const MealPlanner = () => {
  const { mealPlan, addMealToPlan, removeMealFromPlan, recipes } = useMealPlan();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const getWeekDates = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  };

  const weekDates = getWeekDates();

  const getMealsForDateAndType = (date, mealType) => {
    return mealPlan.filter(meal => meal.date === date && meal.mealType === mealType);
  };

  const handleAddMeal = (recipe) => {
    addMealToPlan(selectedDate, selectedMealType, recipe, 1);
    setShowAddMeal(false);
  };

  const getTotalNutritionForDate = (date) => {
    const dayMeals = mealPlan.filter(meal => meal.date === date);
    return dayMeals.reduce((total, meal) => {
      const multiplier = meal.servings / meal.recipe.servings;
      return total + (meal.recipe.nutrition.calories * multiplier);
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Planner</h1>
        <p className="text-gray-600">Plan your meals for the week ahead</p>
      </div>

      {/* Week View */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-8 bg-gray-50 border-b">
          <div className="p-4 font-medium text-gray-900">Meal Type</div>
          {daysOfWeek.map((day, index) => (
            <div key={day} className="p-4 text-center">
              <div className="font-medium text-gray-900">{day}</div>
              <div className="text-sm text-gray-500">{new Date(weekDates[index]).getDate()}</div>
              <div className="text-xs text-emerald-600 mt-1">
                {Math.round(getTotalNutritionForDate(weekDates[index]))} cal
              </div>
            </div>
          ))}
        </div>

        {mealTypes.map(mealType => (
          <div key={mealType} className="grid grid-cols-8 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center">
              <span className="font-medium text-gray-900 capitalize">{mealType}</span>
            </div>
            {weekDates.map(date => {
              const meals = getMealsForDateAndType(date, mealType);
              return (
                <div key={`${date}-${mealType}`} className="p-2 min-h-24 border-l border-gray-100">
                  <div className="space-y-1">
                    {meals.map(meal => (
                      <div
                        key={meal._id}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs relative group"
                      >
                        <button
                          onClick={() => removeMealFromPlan(meal._id)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="font-medium text-gray-900 mb-1">{meal.recipe.name}</div>
                        <div className="text-gray-600">
                          {Math.round(meal.recipe.nutrition.calories * meal.servings / meal.recipe.servings)} cal
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{meal.recipe.prepTime + meal.recipe.cookTime}m</span>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedMealType(mealType);
                        setShowAddMeal(true);
                      }}
                      className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-emerald-300 hover:text-emerald-600 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add {selectedMealType} for {new Date(selectedDate).toLocaleDateString()}
                </h2>
                <button
                  onClick={() => setShowAddMeal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {recipes.map(recipe => (
                  <div
                    key={recipe._id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors cursor-pointer"
                    onClick={() => handleAddMeal(recipe)}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{recipe.name}</h3>
                      <p className="text-sm text-gray-500">{recipe.cuisine} • {recipe.difficulty}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.prepTime + recipe.cookTime} min</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{recipe.servings} servings</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{recipe.nutrition.calories}</div>
                      <div className="text-sm text-gray-500">calories</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;