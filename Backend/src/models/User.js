import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: false, // Optional for Google users
  },

  googleId: {
    type: String, // For Google OAuth users
  },

  accountType: {
    type: String,
    enum: ["Admin", "Student"],
    required: true,
    default: "Student",
  },

  active: {
    type: Boolean,
    default: true,
  },

  approved: {
    type: Boolean,
    default: true,
  },

  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: false,
  },

  image: {
    type: String,
    required: false,
  },

  token: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },

  theme: {
    type: String,
    enum: ["dark", "light"],
    default: "light",
  },

  currency: {
    type: String,
    default: "INR",
  },

  notification: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: false },
  },

  savings: {
    type: Number,
    default: 0,
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
}, { timestamps: true });

// ✅ Virtual for full name
userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// ✅ Ensure virtuals are included in toJSON and toObject
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

// Optional: Update `updatedAt` on save
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const User = mongoose.model("User", userSchema);
