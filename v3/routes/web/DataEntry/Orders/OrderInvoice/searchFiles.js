const express = require("express");
const router = express.Router();
const {
  searchFiles,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderInvoice/searchFiles");

router.post("/", searchFiles);

module.exports = router;
