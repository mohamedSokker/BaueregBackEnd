const express = require("express");
const router = express.Router();
const { home } = require("../../../controllers/web/Home/home");

router.post("/", home);

module.exports = router;
