const express = require("express");
const router = express.Router();
const { getAllAppNotification } = require("../controllers/AppNotification");
const { getAppNotification } = require("../controllers/AppNotification");
const { addAppNotification } = require("../controllers/AppNotification");
const { updateAppNotification } = require("../controllers/AppNotification");
const { deleteAppNotification } = require("../controllers/AppNotification");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", getAllAppNotification);

router.get("/:id", getAppNotification);

router.post("/", addAppNotification);

router.put("/:id", updateAppNotification);

router.delete("/:id", deleteAppNotification);

module.exports = router;
