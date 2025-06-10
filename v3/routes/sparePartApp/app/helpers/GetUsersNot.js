const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
} = require("../../../../controllers/sparePartApp/app/helpers/GetUsersNot");

router.post("/", getUserNotifications);

module.exports = router;
