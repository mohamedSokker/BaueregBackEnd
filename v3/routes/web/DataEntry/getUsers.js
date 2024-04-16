const express = require("express");
const router = express.Router();
const {
  getUsersSites,
} = require("../../../controllers/web/DataEntry/getUsers");

router.post("/", getUsersSites);

module.exports = router;
