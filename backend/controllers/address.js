const User = require("../models/user");

// Add or update address
exports.setAddress = async (req, res) => {
  const userId = req.params.userId;
  const { country, city, streetAddress, postalCode } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        address: {
          country,
          city,
          streetAddress,
          postalCode,
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Address updated", address: user.address });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get user's address
exports.getAddress = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select("address");

    if (!user || !user.address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ address: user.address });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete user's address
exports.deleteAddress = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $unset: { address: 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Address removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
