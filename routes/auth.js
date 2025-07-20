const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const passport = require("passport");
const User = require("../models/User.js");
const auth = require("../middleware/auth.js");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ name, email, password: hashed });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete,
        dietaryPreferences: user.dietaryPreferences,
        allergies: user.allergies,
        fitnessGoals: user.fitnessGoals,
        dailyCalorieGoal: user.dailyCalorieGoal,
        macroGoals: user.macroGoals,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "shhhhh",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete,
        dietaryPreferences: user.dietaryPreferences,
        allergies: user.allergies,
        fitnessGoals: user.fitnessGoals,
        dailyCalorieGoal: user.dailyCalorieGoal,
        macroGoals: user.macroGoals,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete,
        dietaryPreferences: user.dietaryPreferences,
        allergies: user.allergies,
        fitnessGoals: user.fitnessGoals,
        dailyCalorieGoal: user.dailyCalorieGoal,
        macroGoals: user.macroGoals,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update profile
router.put("/profile", auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...updates, profileComplete: true },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete,
        dietaryPreferences: user.dietaryPreferences,
        allergies: user.allergies,
        fitnessGoals: user.fitnessGoals,
        dailyCalorieGoal: user.dailyCalorieGoal,
        macroGoals: user.macroGoals,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "shhhhh",
      { expiresIn: "15m" } // Token valid for 15 minutes
    );

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Link",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", error: error });
  }
});

//Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "shhhhh");

    const user = await User.findById(decoded.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid token or user not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password reset successfull" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// Google OAuth entry point
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || "shhhhh",
      { expiresIn: "1d" }
    );

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/oauth-success?token=${token}`);
  }
);
module.exports = router;
