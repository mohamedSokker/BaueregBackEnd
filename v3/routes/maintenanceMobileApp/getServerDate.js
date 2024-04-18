const express = require("express");
const router = express.Router();
const {
  logic,
} = require("../../controllers/maintenanceMobileApp/getServerDate");

router.use((req, res, next) => {
  console.log("app get Server Date middleware");
  next();
});

router.post("/", logic);

module.exports = router;
