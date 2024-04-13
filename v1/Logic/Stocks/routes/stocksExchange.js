const express = require("express");
const router = express.Router();

const { stocksExchange } = require("../controllers/stocksExchange");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.post("/", stocksExchange);

module.exports = router;
