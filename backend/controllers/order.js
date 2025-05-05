const Order = require("../models/order");
const Cart = require("../models/cart");

// WEBHOOK CALL
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ status: "fail", message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.name,
      imageUrl: item.imageUrl,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      userId,
      items: orderItems,
      total: cart.totalPrice,
    });

    // Clear the cart
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ status: "success", data: { order } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: "success", data: { orders } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("items.productId");

    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Order not found" });
    }

    res.status(200).json({ status: "success", data: { order } });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
