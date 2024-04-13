const express = require("express");
const router = express.Router();
const { createFolder } = require("../controllers/OrdersCreateFolder");

router.get("/", createFolder);

module.exports = router;
