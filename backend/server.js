require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const checkoutRoute = require("./routes/checkout");
const webhookRoutes = require("./routes/webhook");
const orderRoute = require("./routes/order");

const app = express();

app.use("/api", webhookRoutes);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONNECTION)
  .then(() => console.log("DB connection successfully"));

app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", cartRoute);
app.use("/api", checkoutRoute);
app.use("/api", orderRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
