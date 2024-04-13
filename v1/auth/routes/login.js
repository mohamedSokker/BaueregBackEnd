const express = require("express");
const router = express.Router();
const loginapp = require("../controllers/login");

router.post("/", loginapp);

module.exports = router;
