const express = require("express");
const router = express.Router();
const {
  maintenance,
} = require("../../../controllers/web/Dashboard/maintenance");

router.get("/", maintenance);

module.exports = router;
