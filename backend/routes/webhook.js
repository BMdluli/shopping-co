const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhook");

// ✅ Stripe webhook must use raw body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController.stripeWebhook
);

module.exports = router;
