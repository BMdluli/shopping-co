const express = require("express");
const { createCheckoutSession } = require("../controllers/checkout");
const { protect } = require("../middleware/auth"); // assuming you have auth middleware
const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);

module.exports = router;
