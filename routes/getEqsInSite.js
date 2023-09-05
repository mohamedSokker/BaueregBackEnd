const express = require("express");
const router = express.Router();
const { getEqsInSites } = require("../controllers/getEqsInSite");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", getEqsInSites);

module.exports = router;
