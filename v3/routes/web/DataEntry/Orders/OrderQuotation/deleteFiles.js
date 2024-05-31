const express = require("express");
const router = express.Router();
const {
  deleteFile,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderQuotation/deleteFiles");

router.post("/", deleteFile);

module.exports = router;
