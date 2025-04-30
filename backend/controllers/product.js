const Product = require("../models/product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong trying to retrieve products",
    });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });

    if (!product) {
      res.status(404).json({
        status: "fail",
        message: "Could not find product with that id",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong trying to retrieve products",
      error: e.message,
    });
  }
};

module.exports.getHomeSections = async (req, res) => {
  try {
    const [newArrivals, topSelling] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).limit(4),
      Product.find().sort({ sold: -1 }).limit(8),
    ]);

    res.status(200).json({
      status: "success",
      data: { newArrivals, topSelling },
    });
  } catch (e) {
    console.error("Error fetching home sections:", e);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong retrieving products for the homepage",
      error: e.message,
    });
  }
};
