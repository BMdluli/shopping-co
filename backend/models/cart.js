const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
  size: {
    type: String,
    enum: ["small", "medium", "large", "x-Large"],
    required: true,
  }, // Include selected size
  price: { type: Number, required: true }, // Price at the time of adding
  name: { type: String, required: true },
  imageUrl: { type: String },
});

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
    unique: true,
  }, // Required and unique for logged-in users
  items: [cartItemSchema],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
