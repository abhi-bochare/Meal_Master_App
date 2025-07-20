const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth.js");
const recipeRoutes = require("./routes/recipes.js");
const mealPlanRoutes = require("./routes/mealPlan.js");
const connectToDB = require("./config/db.js");
require("dotenv").config();
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend origin
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
connectToDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/meal-plan", mealPlanRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "MealMaster API is running!" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
