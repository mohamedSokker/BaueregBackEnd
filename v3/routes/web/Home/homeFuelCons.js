const express = require("express");
const router = express.Router();
const {
  HomeFuelConsumption,
} = require("../../../controllers/web/Home/homeFuelCons");

router.post("/", HomeFuelConsumption);

module.exports = router;
