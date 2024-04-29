const express = require("express");
const router = express.Router();

const {
  addstocks,
} = require("../../../../controllers/sparePartApp/app/StocksActions/StocksTransition");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.post("/", addstocks);

module.exports = router;
