const mongoose = require("mongoose");

// Define the Workout schema
const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  focus: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
});

// Create the Workout model
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
