const express = require("express");
const router = express.Router();
const {
  getUsersToken,
} = require("../../../../controllers/sparePartApp/app/Token/GetUsersToken");

router.post("/", getUsersToken);

module.exports = router;
