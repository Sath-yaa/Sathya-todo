import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("saTodo", todoSchema);
