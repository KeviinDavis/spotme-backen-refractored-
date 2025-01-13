const express = require("express");
const Workout = require("../models/workout");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate users
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authorization token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Create Workout
router.post("/create", authenticate, async (req, res) => {
  const { title, date, focus } = req.body;
  try {
    const workout = new Workout({ title, date, focus, user: req.userId });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: "Error creating workout" });
  }
});

// Get Workouts
router.get("/", authenticate, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userId });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching workouts" });
  }
});

// Update Workout
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, date, focus } = req.body;
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, date, focus },
      { new: true }
    );
    if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json(updatedWorkout);
  } catch (err) {
    res.status(500).json({ message: "Error updating workout" });
  }
});

// Delete Workout
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedWorkout = await Workout.findOneAndDelete({ _id: id, user: req.userId });
    if (!deletedWorkout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting workout" });
  }
});

module.exports = router;
