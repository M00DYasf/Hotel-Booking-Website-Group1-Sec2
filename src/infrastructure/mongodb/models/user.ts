import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["guest", "user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", UserSchema);