const express = require("express");
const router = express.Router();
const { getAllAppPlaceOrder } = require("../controllers/AppPlaceOrder");
const { getAppPlaceOrder } = require("../controllers/AppPlaceOrder");
const { addAppPlaceOrder } = require("../controllers/AppPlaceOrder");
const { updateAppPlaceOrder } = require("../controllers/AppPlaceOrder");
const { deleteAppPlaceOrder } = require("../controllers/AppPlaceOrder");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", getAllAppPlaceOrder);

router.get("/:id", getAppPlaceOrder);

router.post("/", addAppPlaceOrder);

router.put("/:id", updateAppPlaceOrder);

router.delete("/:id", deleteAppPlaceOrder);

module.exports = router;
