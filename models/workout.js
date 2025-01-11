const mongoose = require("mongoose");

// Define the Workout schema
const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String, // Keeping this as a simple string for beginners (e.g., "2025-01-10")
    required: true,
  },
  focus: {
    type: String, // e.g., "Legs", "Chest", etc.
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
});

// Create the Workout model
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
