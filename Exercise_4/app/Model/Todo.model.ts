import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    }
  },
  { timestamps: true },
);

const Todo = mongoose.models.todoSchema || mongoose.model("todoSchema", todoSchema);
export default Todo;
