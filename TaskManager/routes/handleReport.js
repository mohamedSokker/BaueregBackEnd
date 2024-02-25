const express = require("express");
const router = express.Router();
const { handleReport } = require("../controllers/handleReport");

router.post("/", handleReport);

module.exports = router;
