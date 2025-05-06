const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workouts");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS
const allowedOrigins = ["http://localhost:5173", "https://spotmee.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
