const express = require("express");
const router = express.Router();
const { getAllFuelConsumption } = require("../controllers/Fuel_Consumption");
const { getFuelConsumption } = require("../controllers/Fuel_Consumption");
const { addFuelConsumption } = require("../controllers/Fuel_Consumption");
const { updateFuelConsumption } = require("../controllers/Fuel_Consumption");
const { deleteFuelConsumption } = require("../controllers/Fuel_Consumption");

// router.use((req,res,next) => {
//     console.log('middleware')
//     next()
// })

router.get("/", getAllFuelConsumption);

router.get("/:id", getFuelConsumption);

router.post("/", addFuelConsumption);

router.put("/:id", updateFuelConsumption);

router.delete("/:id", deleteFuelConsumption);

module.exports = router;
