import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actionType: {
    type: String,
    enum: ["ADD", "EDIT", "DELETE", "ASSIGN", "DRAG_DROP"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ActionLog = mongoose.model("ActionLog", actionLogSchema);

export default ActionLog;
