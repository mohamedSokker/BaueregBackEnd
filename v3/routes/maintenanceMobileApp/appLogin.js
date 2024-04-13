const express = require("express");
const router = express.Router();
const { appLogin } = require("../../controllers/maintenanceMobileApp/appLogin");

router.use((req, res, next) => {
  console.log("app login middleware");
  next();
});

router.post("/", appLogin);

module.exports = router;
