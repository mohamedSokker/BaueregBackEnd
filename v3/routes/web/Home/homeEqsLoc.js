const express = require("express");
const router = express.Router();
const { HomeEqsLoc } = require("../../../controllers/web/Home/homeEqsLoc");

router.post("/", HomeEqsLoc);

module.exports = router;
