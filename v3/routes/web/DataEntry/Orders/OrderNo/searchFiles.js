const express = require("express");
const router = express.Router();
const {
  searchFiles,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderNo/searchFiles");

router.post("/", searchFiles);

module.exports = router;
