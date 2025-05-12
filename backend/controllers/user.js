const User = require("../models/user");

// Get user details
exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select("-password"); // hide password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updateFields = req.body; // assume validation is handled elsewhere

  try {
    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
