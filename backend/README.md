
# SpotMe Back-End

This is the backend API for the SpotMe workout tracking application. It is built with Node.js, Express, and MongoDB, providing secure user authentication and CRUD functionality for managing workouts.

---

## Features

- **User Authentication**: JWT-secured signup and login functionality.
- **Workout Management**: Create, read, update, and delete workouts.
- **Authorization**: Protects routes to ensure only authenticated users can access data.
- **Error Handling**: Well-structured error handling for API responses.

---

## API Documentation

### Authentication Routes

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive a JWT token.

### Workout Routes

- `GET /api/workouts`: Retrieve all workouts for the logged-in user.
- `POST /api/workouts/create`: Add a new workout.
- `PUT /api/workouts/:id`: Update an existing workout.
- `DELETE /api/workouts/:id`: Delete a workout.

---

## Getting Started

To set up the backend locally:

1. Clone the repository:
   git clone https://github.com/KeviinDavis/spotme-backen-refractored-.git
   cd spotme-backen-refractored

   front end: https://github.com/KeviinDavis/spotme-frontend-refractored.git

Deployment
The backend is deployed on Heroku

SpotMe Backend Technologies Used: 
Node.js: Backend runtime.
Express: Framework for building the API.
MongoDB Atlas: Cloud-hosted database.
Mongoose: For data modeling.
JWT: Secures user authentication.

Attributions
Express for API development.
MongoDB Atlas for database hosting.
Heroku for backend deployment.

Next Steps
Advanced Logging: Implement detailed activity logs for tracking.
Exercise Suggestions: Add AI-based workout suggestions based on user history.
Front-End Repository
