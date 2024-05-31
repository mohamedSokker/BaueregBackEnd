const express = require("express");
const router = express.Router();
const {
  uploadItems,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderInvoice/uploadFiles");

router.post("/", uploadItems);

module.exports = router;
