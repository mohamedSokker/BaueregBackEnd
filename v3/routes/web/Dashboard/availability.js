const express = require("express");
const router = express.Router();
const {
  availability,
} = require("../../../controllers/web/Dashboard/availability");

router.get("/", availability);

module.exports = router;
