import React from 'react';
import { Utensils } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Utensils className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-semibold text-gray-900">MealMaster</span>
        </div>
        <p className="text-gray-600">Loading your nutrition dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;