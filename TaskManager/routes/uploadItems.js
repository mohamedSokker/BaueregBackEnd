const express = require("express");
const router = express.Router();
const { uploadItems } = require("../controllers/uploadItems");

router.post("/", uploadItems);

module.exports = router;
