const express = require("express");
const router = express.Router();
const logic = require("../controllers/logic");

router.use((req, res, next) => {
  console.log("Sites Production middleware");
  next();
});

router.post("/", logic);

module.exports = router;
