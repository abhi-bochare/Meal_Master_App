import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MealPlanProvider } from "./contexts/MealPlanContext";

import OAuthSuccess from "./components/OAuthSuccess";
import ResetPassword from "./components/ResetPassword";
import LandingPage from "./components/LandingPage";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import MealPlanner from "./components/MealPlanner";
import RecipeDatabase from "./components/RecipeDatabase";
import NutritionTracker from "./components/NutritionTracker";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

function AppRoutes() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen">
      {!user ? (
        <Routes>
          <Route
            path="/"
            element={<LandingPage onGetStarted={handleGetStarted} />}
          />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <>
          <main className="pt-16 bg-gray-50 min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
              <Route path="/recipes" element={<RecipeDatabase />} />
              <Route path="/nutrition" element={<NutritionTracker />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MealPlanProvider>
          <AppRoutes />
        </MealPlanProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
