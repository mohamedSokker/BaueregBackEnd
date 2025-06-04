const express = require("express");
const router = express.Router();
const {
  HomeProdPiles,
} = require("../../../controllers/web/Home/homeProdPiles");

router.post("/", HomeProdPiles);

module.exports = router;
