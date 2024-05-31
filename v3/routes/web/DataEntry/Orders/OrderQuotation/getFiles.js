const express = require("express");
const router = express.Router();
const {
  getFiles,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderQuotation/getFiles");

router.post("/", getFiles);

module.exports = router;
