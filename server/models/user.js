import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name not provided!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name not provided!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "Email not provided!"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    required: [true, "Please specify user role"]
  },
  password: {
    type: String,
    required: [true, 'Password not provided!']
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);