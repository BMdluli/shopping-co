const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

// All cart routes now require authentication
router.get("/cart", authMiddleware.protect, cartController.getCart);
router.post(
  "/cart/items",
  authMiddleware.protect,
  cartController.addItemToCart
);
router.put(
  "/cart/items/:itemId",
  authMiddleware.protect,
  cartController.updateCartItemQuantity
);
router.delete(
  "/cart/items/:itemId",
  authMiddleware.protect,
  cartController.removeCartItem
);
router.delete("/cart", authMiddleware.protect, cartController.clearCart);

module.exports = router;
