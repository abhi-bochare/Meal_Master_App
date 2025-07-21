const mongoose = require("mongoose");
require("dotenv").config();
//const seedDatabase = require("../seedData");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected To database");

    // Seed data only after successful connection
    //seedDatabase();
  } catch (err) {
    console.log("Error in connecting Database" + err);
  }
};

module.exports = connectToDB;
