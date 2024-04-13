const express = require("express");
const router = express.Router();
const { getUserNotifications } = require("../controllers/getUserNotifications");

router.post("/", getUserNotifications);

module.exports = router;
