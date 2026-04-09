import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userId: { type: String, default: null },
  resourceId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ["PENDING", "ACCEPTED", "DECLINED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model("Booking", BookingSchema);