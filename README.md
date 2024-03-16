# Habit Tracker: Build and Maintain Your Routines

[Demo](https://habit-tracker-wnun.onrender.com) : https://habit-tracker-wnun.onrender.com

## Table of Contents

- [Overview](#overview)
- [Key Features](#Key-Features)
- [Folder Structure](#folder-structure)
- [File Descriptions](#file-descriptions)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview

The Habit Tracker app empowers you to take control of your daily routines. Create, track, and manage your habits with ease. Whether you're aiming to exercise regularly, meditate daily, or simply drink more water, Habit Tracker provides the tools you need to succeed.

## Key Features

- Intuitive Habit Management - Effortlessly add, edit, and remove habits as your goals evolve.
- Daily Tracking - Mark habits as completed or incomplete to monitor your progress visually.
- User-Specific Focus - The app is designed for your individual needs. Track habits that matter to you.
- User-Specific Focus - Built with a technology stack including Node.js, Express, MongoDB, and EJS for a smooth and efficient user experience.

## Folder Structure

The project follows a structured folder organization:

- habit-tracker/
  - |- assets/ # Contains static assets like CSS and JavaScript files
  - |- config/ # Database connection configuration
  - |- controllers/ # Controllers handling business logic
  - |- middleware/ # Middleware functions for request processing
  - |- models/ # Models defining data structures and operations
  - |- routes/ # Express routes for defining API endpoints
  - |- utils/ # Error handling Middleware functions
  - |- views/ # Contains EJS templates for rendering views
  - |- index.js # Main entry point of the application
  - |- env.js # Environment variables declaration (PORT, mongoURI)

## File Descriptions

- **views/**: Contains EJS templates for rendering different views of the application.

  - `layout.ejs`: Common layout view including header, main content, and footer.
  - `allHabits.ejs`: Landing page with displaing all the habits.
  - `weekView.ejs`: Displaying week view of habits.

- **controllers/**: Contains controller files responsible for handling business logic.

  - `habit.controller.js`: Handles user habits operations.

- **models/**: Defines data structures and operations.

  - `habit.schema.js`: Manages structure of habits data.

- **middleware/**: Contains middleware functions for request processing.

  - `errorHandlerMiddleware.js`: Middleware for handling errors.
  - `invalidRoutesHandler.middleware.js`: Middleware for handling invalid routes.

- **routes/**: Defines Express routes for API endpoints.

  - `habitRoutes.js`: Routes for habits.

- **assets/**: Contains static assets like CSS and JavaScript files used in the frontend.

- **index.js**: Main entry point of the application where server setup and configuration occur.

## Setup and Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone `
2. Install dependencies: `npm install`
3. Configure environment variables.
4. Start the server: `node index.js`
5. Visit `http://localhost:3000` in your browser to access the application.

## Usage

Once the server is running, users can access the job portal through the provided routes and views. Access your habits and track progress effortlessly. Create, edit, or remove habits as needed. Mark them complete daily to build streaks and view your weekly performance - all within a user-friendly interface. Take charge of your routines with Habit Tracker!

## Contributing

Contributions to the project are welcome! Feel free to open issues or submit pull requests to help improve the project.
I hope this README content is helpful!😊
