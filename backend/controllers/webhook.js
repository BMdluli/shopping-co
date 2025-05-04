const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cart");

// Use raw body for this route in your main app file (important!)
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Construct the event using the raw request body
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️  Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`); // Stripe needs this for validation
  }

  // Handle successful checkout session completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId; // Retrieve userId from session metadata
    if (!userId) {
      console.warn("⚠️  No userId in session metadata.");
      return res.status(400).send("Missing userId in session metadata");
    }

    try {
      // Clear cart for the user after successful checkout
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { items: [], totalQuantity: 0, totalPrice: 0 },
        { new: true } // Returns the updated cart
      );

      if (!cart) {
        console.warn(`⚠️  No cart found for userId: ${userId}`);
        return res.status(404).send("Cart not found for the user");
      }

      console.log(`✅ Cart cleared for user ${userId}`);
    } catch (err) {
      console.error("❌ Failed to clear cart:", err.message);
      return res.status(500).send("Internal Server Error");
    }
  }

  // Successfully processed webhook
  res.status(200).send();
};
