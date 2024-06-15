const express = require("express");
const router = express.Router();
const {
  renameFile,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderQuotation/rename");

router.post("/", renameFile);

module.exports = router;
