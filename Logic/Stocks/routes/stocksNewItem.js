const express = require("express");
const router = express.Router();

const { stocksNewItem } = require("../controllers/stocksNewItem");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.post("/", stocksNewItem);

module.exports = router;
