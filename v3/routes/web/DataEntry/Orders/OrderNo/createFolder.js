const express = require("express");
const router = express.Router();
const {
  createFolder,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderNo/createFolder");

router.post("/", createFolder);

module.exports = router;
