const express = require("express");
const router = express.Router();
const {
  getReports,
} = require("../../../controllers/web/TaskManager/getReports");

router.get("/", getReports);

module.exports = router;
