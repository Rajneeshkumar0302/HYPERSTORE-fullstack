// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, required: true, unique: true,
   match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]},

  password: { type: String, required: true },
  role: {type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
