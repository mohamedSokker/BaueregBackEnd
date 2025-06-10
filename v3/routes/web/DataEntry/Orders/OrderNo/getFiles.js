const express = require("express");
const router = express.Router();
const {
  getFiles,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderNo/getFiles");

router.post("/", getFiles);

module.exports = router;
