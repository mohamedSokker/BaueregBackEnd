const express = require("express");
const router = express.Router();
const {
  setUserSite,
} = require("../../../../controllers/sparePartApp/app/helpers/SetUserSite");

router.post("/", setUserSite);

module.exports = router;
