const express = require("express");
const router = express.Router();

const { orderCheck } = require("../controllers/OrderCheck");

router.get("/", orderCheck);

module.exports = router;
