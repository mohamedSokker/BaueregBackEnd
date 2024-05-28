const express = require("express");
const router = express.Router();
const {
  getActiveMachinary,
} = require("../../../controllers/web/DataEntry/getActiveMachinary");

router.post("/", getActiveMachinary);

module.exports = router;
