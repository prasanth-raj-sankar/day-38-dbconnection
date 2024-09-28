// Mongoose Models used in the application
import { model, Schema } from "mongoose";

import mongoose from "mongoose";
// No/Empty Scheme --> No validation

const userScheme = new Schema({
  password: {
    type: "string",
    minLength: [6, "Should be 6 characters in length"],
    maxLength: 12,
    required: true,
  },
  
});


// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shortUrl: { type: String, required: true, unique: true },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now },
// });

// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true }, // Make sure this field is present
//   shortUrl: { type: String, required: true, unique: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export const urlModel = mongoose.model("Url", urlSchema);


const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a user model for user reference
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const urlModel = mongoose.model("Url", urlSchema);


export const userModel = new model("user", userScheme, "users");
// export const urlModel = mongoose.model("Url", urlSchema);
