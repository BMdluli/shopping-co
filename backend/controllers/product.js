const Product = require("../models/product");

module.exports.getProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // ?category=shirts&isSale=true
    let filterQuery = Product.find(queryObj);

    // ?sort=price
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      filterQuery = filterQuery.sort(sortBy);
    } else {
      filterQuery = filterQuery.sort("-createdAt");
    }

    // ?page=2&limit=10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    filterQuery = filterQuery.skip(skip).limit(limit);

    // Execute query
    const products = await filterQuery;

    // Get total count
    const total = await Product.countDocuments(queryObj);

    res.status(200).json({
      status: "success",
      results: products.length,
      page,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong trying to retrieve products",
      error: e.message,
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
