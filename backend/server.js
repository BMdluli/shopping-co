require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const productRoute = require("./routes/product");
const app = express();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONNECTION)
  .then(() => console.log("DB connection successfully"));

app.use("/api", productRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
