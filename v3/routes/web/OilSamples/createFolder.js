const express = require("express");
const router = express.Router();
const {
  createFolder,
} = require("../../../controllers/web/OilSamples/createFolder");

router.post("/", createFolder);

module.exports = router;
