const express = require("express");
const router = express.Router();
const {
  uploadItems,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderConfirmation/uploadFiles");

router.post("/", uploadItems);

module.exports = router;
