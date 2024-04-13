const express = require("express");
const router = express.Router();
const { setUserSite } = require("../controllers/setUserSite");

router.post("/", setUserSite);

module.exports = router;
