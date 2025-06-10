const express = require("express");
const router = express.Router();
const {
  HomeProdTrench,
} = require("../../../controllers/web/Home/homeProdTrench");

router.post("/", HomeProdTrench);

module.exports = router;
