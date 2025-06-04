const express = require("express");
const router = express.Router();
const {
  HomeLocGBTrench,
} = require("../../../controllers/web/Home/homeLocGBTrench");

router.post("/", HomeLocGBTrench);

module.exports = router;
