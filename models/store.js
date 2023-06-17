import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    maxlength: 60,
  },
  status: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);