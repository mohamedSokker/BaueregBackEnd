const express = require("express");
const router = express.Router();
const {
  getReports,
} = require("../../controllers/maintenanceMobileApp/getReports");

router.use((req, res, next) => {
  console.log("app get reports middleware");
  next();
});

router.post("/", getReports);

module.exports = router;
