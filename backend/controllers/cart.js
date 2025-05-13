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
    const requestedQty = parseInt(quantity);

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    // Find selected size
    const selectedSize = product.sizes.find((s) => s.size === size);
    if (!selectedSize) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid size "${size}" selected.`,
      });
    }

    const availableQty = selectedSize.quantity;
    const effectivePrice = product.isSale ? product.salePrice : product.price;

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      // If requested quantity exceeds available, reject
      if (requestedQty > availableQty) {
        return res.status(400).json({
          status: "fail",
          message: `Only ${availableQty} item(s) available for size ${size}.`,
        });
      }

      // Create new cart with item
      cart = await Cart.create({
        userId: req.user._id,
        items: [
          {
            productId: product._id,
            quantity: requestedQty,
            size,
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

    // Check if item with same product and size exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    const currentQtyInCart =
      existingItemIndex > -1 ? cart.items[existingItemIndex].quantity : 0;

    if (currentQtyInCart + requestedQty > availableQty) {
      return res.status(400).json({
        status: "fail",
        message: `Only ${
          availableQty - currentQtyInCart
        } item(s) left in stock for size ${size}.`,
      });
    }

    // Update or add item
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += requestedQty;
    } else {
      cart.items.push({
        productId: product._id,
        quantity: requestedQty,
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
    console.error("Error adding item to cart:", error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong while adding item to cart.",
      error: error.message,
    });
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
