import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const User1Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0, // Set the default value to 0
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Users1" }
);

// Add a pre-save hook to generate a unique userId for each user
User1Schema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = uuidv4();
  }
  next();
});

export default mongoose.models.Users1 || mongoose.model("Users1", User1Schema);
