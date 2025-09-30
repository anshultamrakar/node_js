const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // validate(value) {
      //   if (validator.isEmail(value)) {
      //     throw new Error("Enter a valid email address");
      //   }
      // },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Enter a valid gender");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/user-circle-isolated-icon-round-600nw-2459622791.jpg",
    },
    about: {
      type: String,
      default: "All about the specific users!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
