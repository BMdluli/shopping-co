const express = require("express");
const {
  getProducts,
  getProduct,
  getHomeSections,
} = require("../controllers/product");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/home-section", getHomeSections);
router.get("/products/:id", getProduct);

module.exports = router;
