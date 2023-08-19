const express = require("express");
const router = express.Router();

const { uploadItems } = require("../controllers/OrdersUploadFolder");

router.post("/", uploadItems);

module.exports = router;
