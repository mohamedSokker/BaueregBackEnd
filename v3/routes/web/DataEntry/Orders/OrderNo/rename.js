const express = require("express");
const router = express.Router();
const {
  renameFile,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderNo/rename");

router.post("/", renameFile);

module.exports = router;
