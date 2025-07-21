import React, { useState } from 'react';
import { User, Target, AlertCircle, Save, Edit2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dailyCalorieGoal: user?.dailyCalorieGoal || 2000,
    dietaryPreferences: user?.dietaryPreferences || [],
    allergies: user?.allergies || [],
    fitnessGoals: user?.fitnessGoals || [],
    macroGoals: user?.macroGoals || { protein: 25, carbs: 50, fat: 25 }
  });

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Mediterranean',
    'Low-Carb', 'High-Protein', 'Gluten-Free', 'Dairy-Free'
  ];

  const allergyOptions = [
    'Nuts', 'Dairy', 'Eggs', 'Soy', 'Shellfish', 'Fish', 'Gluten', 'Sesame'
  ];

  const fitnessGoalOptions = [
    'Weight Loss', 'Muscle Gain', 'Maintain Weight', 'Improve Health',
    'Increase Energy', 'Better Sleep', 'Reduce Stress'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleMacroChange = (macro, value) => {
    setFormData(prev => ({
      ...prev,
      macroGoals: {
        ...prev.macroGoals,
        [macro]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Calorie Goal
                  </label>
                  <input
                    type="number"
                    value={formData.dailyCalorieGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, dailyCalorieGoal: Number(e.target.value) }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Macro Goals */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Macro Goals (%)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Protein: {formData.macroGoals.protein}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={formData.macroGoals.protein}
                    onChange={(e) => handleMacroChange('protein', Number(e.target.value))}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carbs: {formData.macroGoals.carbs}%
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    value={formData.macroGoals.carbs}
                    onChange={(e) => handleMacroChange('carbs', Number(e.target.value))}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fat: {formData.macroGoals.fat}%
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="40"
                    value={formData.macroGoals.fat}
                    onChange={(e) => handleMacroChange('fat', Number(e.target.value))}
                    disabled={!isEditing}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dietary Preferences</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dietaryPreferences.includes(option)}
                    onChange={(e) => handleArrayChange('dietaryPreferences', option, e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Allergies & Restrictions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allergyOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allergies.includes(option)}
                    onChange={(e) => handleArrayChange('allergies', option, e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fitness Goals */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fitness Goals</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {fitnessGoalOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.fitnessGoals.includes(option)}
                    onChange={(e) => handleArrayChange('fitnessGoals', option, e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;