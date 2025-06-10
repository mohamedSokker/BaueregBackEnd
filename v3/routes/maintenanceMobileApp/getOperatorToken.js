const express = require("express");
const router = express.Router();
const {
  logic,
} = require("../../controllers/maintenanceMobileApp/getOperatorToken");

router.use((req, res, next) => {
  console.log("app get Operator Token middleware");
  next();
});

router.post("/", logic);

module.exports = router;
