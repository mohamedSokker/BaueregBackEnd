const express = require("express");
const router = express.Router();

const {
  stocksNewItem,
} = require("../../../../controllers/sparePartApp/app/StocksActions/StocksNewItem");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.post("/", stocksNewItem);

module.exports = router;
