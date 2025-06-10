const express = require("express");
const router = express.Router();
const {
  HomeLocMudPump,
} = require("../../../controllers/web/Home/homeLocMudPump");

router.post("/", HomeLocMudPump);

module.exports = router;
