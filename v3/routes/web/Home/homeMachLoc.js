const express = require("express");
const router = express.Router();
const { HomeMachLoc } = require("../../../controllers/web/Home/homeMachLoc");

router.post("/", HomeMachLoc);

module.exports = router;
