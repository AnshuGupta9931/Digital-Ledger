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
        required: false, // ✅ Optional for Google users
    },

    googleId: {
        type: String, // ✅ New field for Google OAuth
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
        required: false, // ✅ Optional for Google users
    },
 
    image: {
        type: String,
        required: false, // ✅ Google user might come with a photo
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

    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    friendRequest: [
        {
            from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                default: "pending",
            },
        },
    ],

    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
    ],
}, { timestamps: true });

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const User = mongoose.model("User", userSchema);
