const express = require("express");
const router = express.Router();

const { stocksPlaceOrder } = require("../controllers/stocksPlaceOrder");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.post("/", stocksPlaceOrder);

module.exports = router;
