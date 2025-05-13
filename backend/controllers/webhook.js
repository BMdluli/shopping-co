const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cart");
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

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

      const cart = await Cart.findOne({ userId });
      if (!cart || cart.items.length === 0) {
        return res.status(404).send("Cart is empty or not found");
      }

      const totalAmount = session.amount_total / 100;

      const newOrder = await Order.create({
        userId: user._id,
        items: cart.items,
        total: totalAmount,
        paymentIntentId: session.payment_intent,
        status: "processing",
      });

      // 🔽 Update stock and sold count
      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (!product) continue;

        // Update the size quantity
        const sizeEntry = product.sizes.find(
          (s) => s.size.toLowerCase() === item.size.toLowerCase()
        );

        if (sizeEntry) {
          sizeEntry.quantity = Math.max(sizeEntry.quantity - item.quantity, 0);
        }

        // Increase sold count
        product.sold = (product.sold || 0) + item.quantity;

        await product.save();
      }

      // Clear the cart
      await Cart.findOneAndUpdate(
        { userId },
        { items: [], totalQuantity: 0, totalPrice: 0 },
        { new: true }
      );

      console.log(`✅ Order created and stock updated for user ${user.email}`);
    } catch (err) {
      console.error("❌ Webhook processing error:", err.message);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.status(200).send();
};
