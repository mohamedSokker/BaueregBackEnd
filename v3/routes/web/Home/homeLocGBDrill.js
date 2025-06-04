const express = require("express");
const router = express.Router();
const {
  HomeLocGBDrill,
} = require("../../../controllers/web/Home/homeLocGBDrill");

router.post("/", HomeLocGBDrill);

module.exports = router;
