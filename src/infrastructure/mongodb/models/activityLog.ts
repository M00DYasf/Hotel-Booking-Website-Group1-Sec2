import mongoose, { Schema, Document } from "mongoose";

const ActivityLogSchema = new Schema({
  action:     { type: String, required: true },
  userId:     { type: String, default: null },
  resourceId: { type: String, required: true },
  details:    { type: String, required: true },
  timestamp:  { type: Date, default: Date.now },
  level:      { type: String, default: "info" },
  category:   { type: String, default: "system" },
});

export const ActivityLogModel = mongoose.model("ActivityLog", ActivityLogSchema);