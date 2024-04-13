const express = require("express");
const router = express.Router();
const { getAllmanageUsers } = require("../controllers/appManageUsers");
const { getmanageUsers } = require("../controllers/appManageUsers");
const { addmanageUsers } = require("../controllers/appManageUsers");
const { updatemanageUsers } = require("../controllers/appManageUsers");
const { deletemanageUsers } = require("../controllers/appManageUsers");

router.use((req, res, next) => {
  console.log("app manage Users middleware");
  next();
});

router.get("/", getAllmanageUsers);

router.get("/:id", getmanageUsers);

router.post("/", addmanageUsers);

router.put("/:id", updatemanageUsers);

router.delete("/:id", deletemanageUsers);

module.exports = router;
