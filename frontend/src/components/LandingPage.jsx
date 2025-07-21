import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  TrendingUp,
  Utensils,
  Target,
  Shield,
  PlayCircle,
} from "lucide-react";

const features = [
  {
    Icon: Calendar,
    title: "Smart Meal Planning",
    description:
      "Create weekly meal plans with drag-and-drop simplicity. Personalized suggestions included.",
    bg: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    Icon: TrendingUp,
    title: "Nutrition Tracking",
    description:
      "Track daily intake with nutritional breakdowns — calories, macros, and more.",
    bg: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
  },
  {
    Icon: Target,
    title: "Goal Achievement",
    description:
      "Set and reach your health targets with personalized goals and real-time progress.",
    bg: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
  },
  {
    Icon: Utensils,
    title: "Recipe Database",
    description:
      "Access 15K+ recipes filtered by dietary preferences with full nutrition info.",
    bg: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
  {
    Icon: Users,
    title: "Community Support",
    description:
      "Join a community of users, share your journey, and stay motivated.",
    bg: "from-pink-50 to-pink-100",
    iconColor: "text-pink-600",
  },
  {
    Icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security and full privacy control.",
    bg: "from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
  },
];

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 text-gray-900">
      {/* Hero Section */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Utensils className="text-emerald-600 w-7 h-7" />
            <span>MealMaster</span>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
        >
          Master Your <span className="text-emerald-600">Nutrition</span>,<br />
          <span className="text-blue-600">Transform Your Life</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Plan meals, track your macros, and achieve your health goals with
          MealMaster — the all-in-one nutrition platform.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onGetStarted}
            className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Everything You Need for Better Nutrition
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map(({ Icon, title, description, bg, iconColor }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-xl shadow-md bg-gradient-to-br ${bg} hover:shadow-xl transition`}
              >
                <Icon className={`h-10 w-10 mb-4 ${iconColor}`} />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">
          {[
            { stat: "50K+", label: "Happy Users" },
            { stat: "2M+", label: "Meals Planned" },
            { stat: "15K+", label: "Recipes Available" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">{item.stat}</div>
              <div className="text-emerald-100">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to Transform Your Nutrition?
        </motion.h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands who’ve already improved their health with MealMaster.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition transform hover:scale-105"
        >
          Start Free Trial
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Utensils className="h-6 w-6" /> MealMaster
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} MealMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
