const Cart = require("../models/cart");
const Product = require("../models/product");

const updateCartTotals = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) return;

  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of cart.items) {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  }

  cart.totalQuantity = totalQuantity;
  cart.totalPrice = totalPrice;
  await cart.save();
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.status(200).json({ status: "success", data: { cart } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    const effectivePrice = product.isSale ? product.salePrice : product.price;

    if (!cart) {
      const newCart = await Cart.create({
        userId: req.user._id,
        items: [
          {
            productId: product._id,
            quantity: parseInt(quantity),
            size, // Store the selected size
            price: effectivePrice,
            name: product.name,
            imageUrl: product.imageUrl,
          },
        ],
      });
      await updateCartTotals(req.user._id);
      const populatedCart = await Cart.findOne({
        userId: req.user._id,
      }).populate("items.productId");
      return res
        .status(201)
        .json({ status: "success", data: { cart: populatedCart } });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size // Check for both product and size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += parseInt(quantity);
    } else {
      cart.items.push({
        productId: product._id,
        quantity: parseInt(quantity),
        size,
        price: effectivePrice,
        name: product.name,
        imageUrl: product.imageUrl,
      });
    }

    await cart.save();
    await updateCartTotals(req.user._id);
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.status(200).json({ status: "success", data: { cart: updatedCart } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ status: "fail", message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ status: "fail", message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = parseInt(quantity);
    await cart.save();
    await updateCartTotals(req.user._id);
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.status(200).json({ status: "success", data: { cart: updatedCart } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ status: "fail", message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    await updateCartTotals(req.user._id);
    const updatedCart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    res.status(200).json({ status: "success", data: { cart: updatedCart } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [], totalQuantity: 0, totalPrice: 0 },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Cart cleared successfully",
      data: { cart },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
