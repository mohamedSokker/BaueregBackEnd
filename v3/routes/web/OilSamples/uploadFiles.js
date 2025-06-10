const express = require("express");
const router = express.Router();
const {
  uploadItems,
} = require("../../../controllers/web/OilSamples/uploadFiles");

router.post("/", uploadItems);

module.exports = router;
