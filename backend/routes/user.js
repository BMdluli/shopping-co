const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/user/:userId", userController.getUser);
router.put("/user/:userId", userController.updateUser);

module.exports = router;
