const express = require("express");
const router = express.Router();
const {
  handleRefreshToken,
} = require("../../../controllers/sparePartApp/login&auth/refreshToken");

router.get("/", handleRefreshToken);

module.exports = router;
