import React, { useState } from "react";
import { Search, Filter, Clock, Users, Heart, Star, X } from "lucide-react";
import { useMealPlan } from "../contexts/MealPlanContext";

const RecipeDatabase = () => {
  const { recipes, searchRecipes } = useMealPlan();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    difficulty: "",
    cuisine: "",
    dietaryTags: [],
    maxCookTime: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const cuisines = [
    "Mediterranean",
    "American",
    "Asian",
    "Mexican",
    "Italian",
    "Indian",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];
  const dietaryTags = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Keto-Friendly",
    "High-Protein",
    "Low-Carb",
  ];

  const handleFilterChange = (type, value, isArray = false) => {
    setFilters((prev) => {
      if (isArray) {
        return {
          ...prev,
          [type]: prev[type].includes(value)
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value],
        };
      } else {
        return {
          ...prev,
          [type]: prev[type] === value ? "" : value,
        };
      }
    });
  };

  const filteredRecipes =
    !searchQuery &&
    !filters.difficulty &&
    !filters.cuisine &&
    (!filters.dietaryTags || filters.dietaryTags.length === 0)
      ? recipes
      : searchRecipes(searchQuery, filters);
  //console.log(filteredRecipes);

  const RecipeCard = ({ recipe }) => (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="relative">
        <img
          src={
            recipe.image || "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {recipe.difficulty}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{recipe.name}</h3>
        <p className="text-sm text-gray-600">{recipe.cuisine}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings}</span>
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-semibold text-emerald-600">
            {recipe.nutrition?.calories} cal
          </span>
          <div className="flex flex-wrap gap-1">
            {recipe.dietaryTags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Recipe Database
        </h1>
        <p className="text-gray-600">Discover healthy and delicious recipes</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <label
                      key={difficulty}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={filters.difficulty === difficulty}
                        onChange={() =>
                          handleFilterChange("difficulty", difficulty)
                        }
                        className="rounded border-gray-300 text-emerald-600"
                      />
                      <span>{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cuisine */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine
                </label>
                <div className="space-y-2">
                  {cuisines.map((cuisine) => (
                    <label
                      key={cuisine}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={filters.cuisine === cuisine}
                        onChange={() => handleFilterChange("cuisine", cuisine)}
                        className="rounded border-gray-300 text-emerald-600"
                      />
                      <span>{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Tags
                </label>
                <div className="space-y-2">
                  {dietaryTags.map((tag) => (
                    <label key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.dietaryTags.includes(tag)}
                        onChange={() =>
                          handleFilterChange("dietaryTags", tag, true)
                        }
                        className="rounded border-gray-300 text-emerald-600"
                      />
                      <span>{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Cook Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Cook Time
                </label>
                <select
                  value={filters.maxCookTime}
                  onChange={(e) =>
                    handleFilterChange("maxCookTime", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500"
                >
                  <option value="">Any</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recipe List */}
      {filteredRecipes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No recipes found. Try adjusting your filters or search.
        </p>
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h2>
              <p className="text-gray-600 mb-4">
                {selectedRecipe.cuisine} • {selectedRecipe.difficulty}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((item, i) => (
                      <li key={i} className="flex space-x-2">
                        <span className="text-emerald-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Nutrition</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-emerald-600">
                        {selectedRecipe.nutrition.calories}
                      </div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-600">
                        {selectedRecipe.nutrition.protein}g
                      </div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-600">
                        {selectedRecipe.nutrition.carbs}g
                      </div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-orange-600">
                        {selectedRecipe.nutrition.fat}g
                      </div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((step, i) => (
                    <li key={i} className="flex space-x-3">
                      <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDatabase;
