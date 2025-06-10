const express = require("express");
const router = express.Router();
const {
  createFolder,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderConfirmation/createFolder");

router.post("/", createFolder);

module.exports = router;
