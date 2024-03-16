import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  habit: {
    type: String,
    unique: [true, "name already exists."],
    required: [true, "name of habit is required."],
  },
  habitTime: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  habitRecord: [
    {
      status: {
        type: String,
        enum: ["yes", "no", "none"],
        default: "none",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

export const HabitModel = mongoose.model("habit", habitSchema);
