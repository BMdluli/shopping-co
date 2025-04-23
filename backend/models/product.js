const mongoose = require("mongoose");
const Review = require("./review");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    price: Number,
    description: String,
  },
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
