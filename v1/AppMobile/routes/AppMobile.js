const express = require("express");
const router = express.Router();
const { AppMobile } = require("../controllers/AppMobile");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", AppMobile);

module.exports = router;
