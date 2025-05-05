const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cart");
const Order = require("../models/order");
const User = require("../models/user");

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️  Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Fetch the full PaymentIntent to access metadata
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent
      );
      const userId = paymentIntent.metadata?.userId;

      if (!userId) {
        console.warn("⚠️  No userId in paymentIntent metadata.");
        return res.status(400).send("Missing userId in payment metadata");
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Fetch the cart to get items
      const cart = await Cart.findOne({ userId });
      if (!cart || !cart.items.length) {
        console.warn(`⚠️  No cart or empty cart found for userId: ${userId}`);
        return res.status(404).send("Cart is empty or not found");
      }

      // Calculate total from cart items
      const totalAmount = session.amount_total / 100; // In case you need to use this for `total`

      // Create the order
      const newOrder = await Order.create({
        userId: user._id, // Correct field name: userId
        items: cart.items, // Array of items from cart
        total: totalAmount, // Total amount from session (converted to dollars if needed)
        paymentIntentId: session.payment_intent,
        status: "processing", // Default status
      });

      console.log(`✅ Order created for user ${user.email}:`, newOrder._id);

      // Clear the cart
      await Cart.findOneAndUpdate(
        { userId },
        { items: [], totalQuantity: 0, totalPrice: 0 },
        { new: true }
      );
    } catch (err) {
      console.error("❌ Webhook processing error:", err.message);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.status(200).send();
};
