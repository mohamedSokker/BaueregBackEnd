const express = require("express");
const router = express.Router();
const {
  getEqTransp,
} = require("../../../controllers/web/Transportation/getEqTransp");

router.post("/", getEqTransp);

module.exports = router;
