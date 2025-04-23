const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Users should have an email"],
  },
  password: {
    type: String,
    required: [true, "Users should have a password"],
    min: 8,
  },
  role: {
    type: String,
    enum: ["Customer", "Admin"],
    required: [true, "Users should have a role"],
    default: "Customer",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
