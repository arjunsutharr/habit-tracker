import express from "express";
import HabitController from "../controllers/habit.controller.js";

const router = express.Router();

const habitController = new HabitController();

// delete habit
router.delete("/deleteHabit/:id", habitController.deleteHabit);
// habit status update
router.post("/habitStatusUpdate", habitController.statusUpdate);

//
router.put("/habitStatusUpdate", habitController.statusUpdate);

// Get all habits
router.get("/", habitController.getAllHabits);

// Get week view
router.get("/WeekView", habitController.getWeekView);

// add new Habit
router.post("/addHabit", habitController.addHabit);

export default router;
