import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const googleUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
  },
  { collection: "GoogleUsers" }
);

// Add a pre-save hook to generate a unique userId for each user
googleUserSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = uuidv4();
  }
  next();
});

export default mongoose.models.GoogleUsers || mongoose.model("GoogleUsers", googleUserSchema);
