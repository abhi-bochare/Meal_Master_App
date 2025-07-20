const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: 6,
    },
    googleId: String,
    profileComplete: {
      type: Boolean,
      default: false,
    },
    dietaryPreferences: [
      {
        type: String,
        enum: [
          "Vegetarian",
          "Vegan",
          "Pescatarian",
          "Keto",
          "Paleo",
          "Mediterranean",
          "Low-Carb",
          "High-Protein",
          "Gluten-Free",
          "Dairy-Free",
        ],
      },
    ],
    allergies: [
      {
        type: String,
        enum: [
          "Nuts",
          "Dairy",
          "Eggs",
          "Soy",
          "Shellfish",
          "Fish",
          "Gluten",
          "Sesame",
        ],
      },
    ],
    fitnessGoals: [
      {
        type: String,
        enum: [
          "Weight Loss",
          "Muscle Gain",
          "Maintain Weight",
          "Improve Health",
          "Increase Energy",
          "Better Sleep",
          "Reduce Stress",
        ],
      },
    ],
    dailyCalorieGoal: {
      type: Number,
      default: 2000,
    },
    macroGoals: {
      protein: {
        type: Number,
        default: 25,
      },
      carbs: {
        type: Number,
        default: 50,
      },
      fat: {
        type: Number,
        default: 25,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
