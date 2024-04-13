const express = require("express");
const router = express.Router();
const {
  uploadItems,
} = require("../../../controllers/web/TaskManager/uploadItems");

router.post("/", uploadItems);

module.exports = router;
