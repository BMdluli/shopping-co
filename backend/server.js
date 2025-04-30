require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const app = express();

// MIDDLEWARE
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

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
