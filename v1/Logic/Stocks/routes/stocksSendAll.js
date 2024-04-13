const express = require("express");
const router = express.Router();

const { stocksSendAll } = require("../controllers/stocksSendAll");

router.post("/", stocksSendAll);

module.exports = router;
