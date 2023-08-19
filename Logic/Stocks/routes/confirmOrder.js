const express = require("express");
const router = express.Router();

const { confirmOrder } = require("../controllers/confirmOrder");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.post("/", confirmOrder);

module.exports = router;
