const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Address should have a country"],
  },
  city: {
    type: String,
    required: [true, "Address should have a city"],
  },
  streetAddress: {
    type: String,
    required: [true, "Address should have a street address"],
  },
  postalCode: {
    type: String,
    required: [true, "Address should have a postal code"],
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Users should have an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Users should have a password"],
    min: 8,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  surname: {
    type: String,
    required: [true, "Please provide a surname"],
  },
  dob: {
    type: Date,
    required: [true, "Please provide a date of birth"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  role: {
    type: String,
    enum: ["Customer", "Admin"],
    required: [true, "Users should have a role"],
    default: "Customer",
  },
  address: addressSchema,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
