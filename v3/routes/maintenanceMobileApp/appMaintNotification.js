const express = require("express");
const router = express.Router();
const {
  logic,
} = require("../../controllers/maintenanceMobileApp/appMaintNotification");

router.use((req, res, next) => {
  console.log("appMaint get notification middleware");
  next();
});

router.get("/", logic);
router.post("/", logic);

module.exports = router;
