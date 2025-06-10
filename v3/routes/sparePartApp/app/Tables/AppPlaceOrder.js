const express = require("express");
const router = express.Router();
const {
  getAllAppPlaceOrder,
  getAppPlaceOrder,
  addAppPlaceOrder,
  updateAppPlaceOrder,
  deleteAppPlaceOrder,
} = require("../../../../controllers/sparePartApp/app/Tables/AppPlaceOrder");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.get("/", getAllAppPlaceOrder);

router.get("/:id", getAppPlaceOrder);

router.post("/", addAppPlaceOrder);

router.put("/:id", updateAppPlaceOrder);

router.delete("/:id", deleteAppPlaceOrder);

module.exports = router;
