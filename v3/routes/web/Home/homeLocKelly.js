const express = require("express");
const router = express.Router();
const { HomeLocKelly } = require("../../../controllers/web/Home/homeLocKelly");

router.post("/", HomeLocKelly);

module.exports = router;
