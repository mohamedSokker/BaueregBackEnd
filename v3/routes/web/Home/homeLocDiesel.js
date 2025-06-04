const express = require("express");
const router = express.Router();
const {
  HomeLocDiesel,
} = require("../../../controllers/web/Home/homeLocDiesel");

router.post("/", HomeLocDiesel);

module.exports = router;
