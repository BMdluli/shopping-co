const mongoose = require("mongoose");
const Review = require("./review");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    price: Number,
  },
  description: String,
  category: { type: String },
  imageUrl: String,
  sizes: [
    {
      size: {
        type: String,
        enum: ["small", "medium", "large", "x-Large"],
        required: true,
      },
      quantity: { type: Number, required: true, default: 0 },
    },
  ],
  //   reviews: [Review], // Embedding the review schema directly
  price: { type: Number, required: true, default: 0 },
  sold: { type: Number, required: true, default: 0 },
  isSale: { type: Boolean, default: 0 },
  salePrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
