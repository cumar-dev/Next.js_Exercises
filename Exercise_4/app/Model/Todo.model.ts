import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    }
  },
  { timestamps: true },
);

const Todo = mongoose.model("todoSchema", todoSchema);
export default Todo;
