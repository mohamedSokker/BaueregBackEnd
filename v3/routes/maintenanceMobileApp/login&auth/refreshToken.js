const express = require("express");
const router = express.Router();
const {
  handleRefreshToken,
} = require("../../../controllers/maintenanceMobileApp/login&auth/refreshToken");

router.get("/", handleRefreshToken);

module.exports = router;
