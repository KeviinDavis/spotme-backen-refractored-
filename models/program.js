const mongoose = require("mongoose");

// Sub-schema for individual exercises
const exerciseSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  sets:   { type: Number, required: true },
  reps:   { type: Number, required: true },
  weight: { type: Number, required: true },
});

// Sub-schema for each workout day
const daySchema = new mongoose.Schema({
  name:      { type: String, required: true },
  exercises: [exerciseSchema],
});

// Main Program schema
const programSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    days:  [daySchema],
    user:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
