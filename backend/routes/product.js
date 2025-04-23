const express = require("express");
const { getProducts, getProduct } = require("../controllers/product");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);

module.exports = router;
