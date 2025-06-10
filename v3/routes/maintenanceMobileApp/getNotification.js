const express = require("express");
const router = express.Router();
const {
  getNotification,
} = require("../../controllers/maintenanceMobileApp/getNotification");

router.use((req, res, next) => {
  console.log("app get notification middleware");
  next();
});

router.get("/", getNotification);
router.post("/", getNotification);

module.exports = router;
