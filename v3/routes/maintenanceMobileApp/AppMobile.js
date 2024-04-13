const express = require("express");
const router = express.Router();
const {
  AppMobile,
} = require("../../controllers/maintenanceMobileApp/AppMobile");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", AppMobile);

module.exports = router;
