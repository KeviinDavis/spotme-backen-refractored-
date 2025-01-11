const express = require("express");
const Workout = require("../models/workout");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify JWT and attach user ID to the request
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Create a new workout
router.post("/create", authenticate, async (req, res) => {
  const { title, date, focus } = req.body;

  try {
    const newWorkout = new Workout({
      title,
      date,
      focus,
      user: req.userId,
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(500).json({ message: "Error creating workout", error: err.message });
  }
});

// Get all workouts for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userId }); 
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching workouts", error: err.message });
  }
});

// Update a workout by ID
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params; 
  const { title, date, focus } = req.body; 

  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: id, user: req.userId }, 
      { title, date, focus }, 
      { new: true } 
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found or unauthorized" });
    }

    res.status(200).json(updatedWorkout); // Respond with the updated workout
  } catch (err) {
    res.status(500).json({ message: "Error updating workout", error: err.message });
  }
});

// Delete a workout by ID
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params; // Extract the workout ID from the route parameters

  try {
    const deletedWorkout = await Workout.findOneAndDelete({
      _id: id,
      user: req.userId, 
    });

    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found or unauthorized" });
    }

    res.status(200).json({ message: "Workout deleted successfully", workout: deletedWorkout });
  } catch (err) {
    res.status(500).json({ message: "Error deleting workout", error: err.message });
  }
});

module.exports = router;
