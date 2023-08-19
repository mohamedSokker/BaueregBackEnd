const express = require("express");
const router = express.Router();

const { addstocks } = require("../controllers/stocksTransition");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.post("/", addstocks);

module.exports = router;
