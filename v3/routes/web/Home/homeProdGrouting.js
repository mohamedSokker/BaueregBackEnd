const express = require("express");
const router = express.Router();
const {
  HomeProdGrouting,
} = require("../../../controllers/web/Home/homeProdGrouting");

router.post("/", HomeProdGrouting);

module.exports = router;
