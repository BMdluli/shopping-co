const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address");

router.put("/user/:userId/address", addressController.setAddress);
router.get("/user/:userId/address", addressController.getAddress);
router.delete("/user/:userId/address", addressController.deleteAddress);

module.exports = router;
