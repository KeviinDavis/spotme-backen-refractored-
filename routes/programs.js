const express = require("express");
const Program = require("../models/program");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate users (same as in workouts.js)
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

// Create Program
router.post("/create", authenticate, async (req, res) => {
  const { name, days } = req.body;
  try {
    const program = new Program({ name, days, user: req.userId });
    await program.save();
    res.status(201).json(program);
  } catch (err) {
    res.status(500).json({ message: "Error creating program" });
  }
});

// Get all Programs for this user
router.get("/", authenticate, async (req, res) => {
  try {
    const programs = await Program.find({ user: req.userId });
    res.status(200).json(programs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching programs" });
  }
});

// Update Program
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, days } = req.body;
  try {
    const updated = await Program.findOneAndUpdate(
      { _id: id, user: req.userId },
      { name, days },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Program not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating program" });
  }
});

// Delete Program
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Program.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: "Program not found" });
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting program" });
  }
});

module.exports = router;
