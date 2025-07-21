import React, { useState, useEffect } from "react";
import { Calendar, Target, TrendingUp, Clock, Award, Plus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useMealPlan } from "../contexts/MealPlanContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { mealPlan, getNutritionByDay } = useMealPlan();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const [selectedDay, setSelectedDay] = useState(todayName);
  const todayNutrition = getNutritionByDay(selectedDay);

  const weeklyMeals = mealPlan.length;

  const calorieGoal = user?.dailyCalorieGoal || 2000;
  const proteinGoal = Math.round((calorieGoal * 0.25) / 4); // 25% of calories
  const carbGoal = Math.round((calorieGoal * 0.5) / 4); // 50% of calories
  const fatGoal = Math.round((calorieGoal * 0.25) / 9); // 25% of calories

  const { calories, protein, carbs, fat } = todayNutrition;

  const caloriesPct = Math.min((calories / calorieGoal) * 100, 100);
  const proteinPct = Math.min((protein / proteinGoal) * 100, 100);
  const carbPct = Math.min((carbs / carbGoal) * 100, 100);
  const fatPct = Math.min((fat / fatGoal) * 100, 100);

  const quickStats = [
    {
      title: `${selectedDay}'s Calories`,
      value: Math.round(calories),
      goal: calorieGoal,
      icon: Target,
      color: "bg-emerald-500",
    },
    {
      title: "Weekly Meals",
      value: weeklyMeals,
      goal: 28,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Protein Today",
      value: Math.round(protein),
      goal: proteinGoal,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Streak Days",
      value: 7,
      goal: 7,
      icon: Award,
      color: "bg-orange-500",
    },
  ];

  const caloriesPerDay = {};
  daysOfWeek.forEach((day) => (caloriesPerDay[day] = 0));

  mealPlan.forEach((meal) => {
    const date = new Date(meal.date);
    const day = daysOfWeek[date.getDay()];
    const mealCalories =
      (meal.recipe.nutrition.calories * meal.servings) / meal.recipe.servings;
    caloriesPerDay[day] += mealCalories;
  });

  const totalWeeklyCalories = Object.values(caloriesPerDay).reduce(
    (sum, val) => sum + val,
    0
  );
  const avgCalories = totalWeeklyCalories / 7;
  const weeklyCalorieGoal = calorieGoal * 7;
  const goalProgress = Math.round(
    (totalWeeklyCalories / weeklyCalorieGoal) * 100
  );

  const mealsForToday = mealPlan.filter((meal) => {
    const day = daysOfWeek[new Date(meal.date).getDay()];
    return day === selectedDay;
  });

  const orderedMeals = mealsForToday.sort((a, b) => {
    const order = { breakfast: 1, lunch: 2, dinner: 3, snack: 4 };
    return order[a.mealType] - order[b.mealType];
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's your nutrition overview for {selectedDay}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const progress = Math.min((stat.value / stat.goal) * 100, 100);
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">of {stat.goal}</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{stat.title}</span>
                  <span className="text-gray-500">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${stat.color}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Meals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Today's Meals
              </h2>
            </div>

            {orderedMeals.length > 0 ? (
              <div className="space-y-4">
                {orderedMeals.map((meal, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={meal.recipe.image}
                      alt={meal.recipe.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {meal.recipe.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {meal.mealType}
                      </p>
                      <p className="text-sm text-gray-500">
                        {Math.round(
                          (meal.recipe.nutrition.calories * meal.servings) /
                            meal.recipe.servings
                        )}{" "}
                        calories
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {meal.recipe.prepTime + meal.recipe.cookTime} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No meals planned for {selectedDay}
                </p>
                <button className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium">
                  Plan your first meal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Daily Progress */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Daily Progress
            </h3>
            <ProgressItem
              label="Calories"
              value={Math.round(calories)}
              goal={calorieGoal}
              pct={caloriesPct}
              color="bg-emerald-500"
            />
            <ProgressItem
              label="Protein"
              value={Math.round(protein)}
              goal={proteinGoal}
              pct={proteinPct}
              color="bg-blue-500"
              unit="g"
            />
            <ProgressItem
              label="Carbs"
              value={Math.round(carbs)}
              goal={carbGoal}
              pct={carbPct}
              color="bg-purple-500"
              unit="g"
            />
            <ProgressItem
              label="Fat"
              value={Math.round(fat)}
              goal={fatGoal}
              pct={fatPct}
              color="bg-orange-500"
              unit="g"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Meals Planned</span>
                <span className="font-medium">{weeklyMeals}/21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Calories</span>
                <span className="font-medium">{Math.round(avgCalories)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Goal Progress</span>
                <span className="font-medium text-emerald-600">
                  {goalProgress}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for progress display
const ProgressItem = ({ label, value, goal, pct, color, unit = "" }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">
        {value}
        {unit} / {goal}
        {unit}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${pct}%` }}
      />
    </div>
  </div>
);

export default Dashboard;
