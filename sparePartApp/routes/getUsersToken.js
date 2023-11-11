const express = require("express");
const router = express.Router();
const { getUsersToken } = require("../controllers/getUsersTokens");

router.post("/", getUsersToken);

module.exports = router;
