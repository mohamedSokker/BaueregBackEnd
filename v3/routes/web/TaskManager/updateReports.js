const express = require("express");
const router = express.Router();
const {
  updateReports,
} = require("../../../controllers/web/TaskManager/updateReports");

router.post("/", updateReports);

module.exports = router;
