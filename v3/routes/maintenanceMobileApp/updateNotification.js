const express = require("express");
const router = express.Router();
const {
  updateNotification,
} = require("../../controllers/maintenanceMobileApp/updateNotification");

router.use((req, res, next) => {
  console.log("app update notification middleware");
  next();
});

router.put("/", updateNotification);

module.exports = router;
