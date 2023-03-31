import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
  confirmEmail: {
    type: String,
    required: [true, "Confirm email is required"],
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
  },
}, { collection: 'Users' });

export default mongoose.models.Users || mongoose.model('Users', UserSchema);
