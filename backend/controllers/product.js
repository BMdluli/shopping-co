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
