const express = require("express");
const router = express.Router();
const {
  searchFiles,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderQuotation/searchFiles");

router.post("/", searchFiles);

module.exports = router;
