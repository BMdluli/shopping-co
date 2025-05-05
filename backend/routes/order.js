const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/order");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/orders/", protect, createOrder);
router.get("/orders/", protect, getUserOrders);
router.get("/orders/:id", protect, getOrderById);

module.exports = router;
