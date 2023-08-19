const express = require("express");
const router = express.Router();
const { getAllFuel_Consumption } = require("../controllers/Fuel_Consumption");
const { getFuel_Consumption } = require("../controllers/Fuel_Consumption");
const { addFuel_Consumption } = require("../controllers/Fuel_Consumption");
const { updateFuel_Consumption } = require("../controllers/Fuel_Consumption");
const { deleteFuel_Consumption } = require("../controllers/Fuel_Consumption");

// router.use((req,res,next) => {
//     console.log('middleware')
//     next()
// })

router.get("/", getAllFuel_Consumption);

router.get("/:id", getFuel_Consumption);

router.post("/", addFuel_Consumption);

router.put("/:id", updateFuel_Consumption);

router.delete("/:id", deleteFuel_Consumption);

module.exports = router;
