import { HabitModel } from "../models/habit.schema.js";
import nodeSchedule from "node-schedule";
import { getTodayDate } from "../../assets/js/habit.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export default class HabitController {
  async getAllHabits(req, res, next) {
    try {
      const allHabits = await HabitModel.find();

      res.status(200).render("allHabits", { habits: allHabits, error: null });
    } catch (error) {
      return next(new ErrorHandler(500, "error getting all habits"));
    }
  }

  async getWeekView(req, res, next) {
    try {
      const allHabits = await HabitModel.find();
      if (allHabits) {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (startDate && endDate) {
          allHabits.forEach((habit) => {
            habit.habitRecord = habit.habitRecord.filter((record) => {
              const recordDate = new Date(record.date);
              const recordDateString = recordDate.toISOString().split("T")[0];
              return (
                recordDateString >= startDate && recordDateString <= endDate
              );
            });
          });

          return res.status(200).json({ habits: allHabits });
        } else {
          const todayDate = new Date();
          const sevenDaysAfter = new Date(
            todayDate.getTime() + 6 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0];

          allHabits.forEach((habit) => {
            habit.habitRecord = habit.habitRecord.filter((record) => {
              const recordDate = new Date(record.date)
                .toISOString()
                .split("T")[0];

              return (
                recordDate <= sevenDaysAfter &&
                recordDate >= todayDate.toISOString().split("T")[0]
              );
            });
          });
          res.status(200).render("weekView", {
            habits: allHabits,
            date: sevenDaysAfter,
            error: null,
          });
        }
      }
    } catch (error) {
      return next(new ErrorHandler(500, "error while week view"));
    }
  }

  async addHabit(req, res, next) {
    const { habitName, habitTime } = req.body;
    try {
      if (!habitName || !habitTime) {
        res.redirect("/", {});
      }
      const newHabit = new HabitModel({
        habit: habitName,
        habitTime: habitTime,
      });
      newHabit.habitRecord.push({ status: "none" });
      await newHabit.save();
      res.redirect("/");
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        const allHabits = await HabitModel.find();
        res.status(401).render("allHabits", {
          habits: allHabits,
          error: `${habitName} already added`,
        });
      } else {
        return next(new ErrorHandler(500, "error while adding the Habit"));
      }
    }
  }

  async deleteHabit(req, res, next) {
    try {
      const habitId = req.params.id;
      await HabitModel.findByIdAndDelete(habitId);

      res.redirect("/");
    } catch (error) {
      return next(
        new ErrorHandler(500, "error while updating the status of habit")
      );
    }
  }

  async statusUpdate(req, res, next) {
    try {
      const { habitId, status, recordId } = req.body;

      const habit = await HabitModel.findById(habitId);

      if (!habit) {
        return res.status(404).json({ message: "Habit not found." });
      }

      const recordToUpdate = habit.habitRecord.id(recordId);

      if (!recordToUpdate) {
        return res.status(404).json({ message: "Habit record not found." });
      }

      recordToUpdate.status = status;

      await habit.save();
    } catch (error) {
      return next(
        new ErrorHandler(500, "error while updating the status of habit")
      );
    }
  }

  job = nodeSchedule.scheduleJob("5 0 0 * * *", async () => {
    try {
      const allHabits = await HabitModel.find();

      if (allHabits) {
        allHabits.forEach(async (habit) => {
          const foundRecord = habit.habitRecord.find((record) => {
            const recordDate = getTodayDate(record.date);
            const todayDate = getTodayDate(new Date());
            return recordDate === todayDate;
          });

          if (!foundRecord) {
            habit.habitRecord.push({ status: "none" });
            await habit.save();
          }
        });
      }
    } catch (error) {
      return next(
        new ErrorHandler(500, "error while updating the status of habit")
      );
    }
  });
}

export const addRecord = async () => {
  try {
    const allHabits = await HabitModel.find();

    if (allHabits) {
      allHabits.forEach(async (habit) => {
        const foundRecord = habit.habitRecord.find((record) => {
          const recordDate = getTodayDate(record.date);
          const todayDate = getTodayDate(new Date());
          return recordDate === todayDate;
        });

        if (!foundRecord) {
          habit.habitRecord.push({ status: "none" });
          await habit.save();
        }
      });
    }
  } catch (error) {
    return next(
      new ErrorHandler(500, "error while updating the status of habit")
    );
  }
};
