import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import { connectDB } from "./src/config/db.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandlerMiddleware.js";
import habitRoutes from "./src/routes/habitRoutes.js";
import { getTodayDate, todaysHabitRecord } from "./assets/js/habit.js";

const app = express();

app.use(express.static("src/views"));
app.use(express.static("assets"));
app.locals = { getTodayDate, todaysHabitRecord };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);

app.use("/", habitRoutes);

// error handler setup
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server is listening on: http://localhost:3000/");
  connectDB();
});
