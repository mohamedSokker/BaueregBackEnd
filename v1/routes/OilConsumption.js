const express = require("express");
const router = express.Router();
const { getAllOilConsumption } = require("../controllers/OilConsumption");
const { getOilConsumption } = require("../controllers/OilConsumption");
const { addOilConsumption } = require("../controllers/OilConsumption");
const { updateOilConsumption } = require("../controllers/OilConsumption");
const { deleteOilConsumption } = require("../controllers/OilConsumption");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", getAllOilConsumption);

router.get("/:id", getOilConsumption);

router.post("/", addOilConsumption);

router.put("/:id", updateOilConsumption);

router.delete("/:id", deleteOilConsumption);

module.exports = router;
