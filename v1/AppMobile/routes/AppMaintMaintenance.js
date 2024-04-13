const express = require("express");
const router = express.Router();
const {
  getAllAppMaintMaintenance,
} = require("../controllers/AppMaintMaintenance");
const {
  getAppMaintMaintenance,
} = require("../controllers/AppMaintMaintenance");
const {
  addAppMaintMaintenance,
} = require("../controllers/AppMaintMaintenance");
const {
  updateAppMaintMaintenance,
} = require("../controllers/AppMaintMaintenance");
const {
  deleteAppMaintMaintenance,
} = require("../controllers/AppMaintMaintenance");

router.use((req, res, next) => {
  console.log("AppMaintMaintenance middleware");
  next();
});

router.get("/", getAllAppMaintMaintenance);

router.get("/:id", getAppMaintMaintenance);

router.post("/", addAppMaintMaintenance);

router.put("/:id", updateAppMaintMaintenance);

router.delete("/:id", deleteAppMaintMaintenance);

module.exports = router;
