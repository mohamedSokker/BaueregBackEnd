const express = require("express");
const router = express.Router();
const { getAllmanageUsers } = require("../controllers/manageUsers");
const { getmanageUsers } = require("../controllers/manageUsers");
const { addmanageUsers } = require("../controllers/manageUsers");
const { updatemanageUsers } = require("../controllers/manageUsers");
const { deletemanageUsers } = require("../controllers/manageUsers");

router.use((req, res, next) => {
  console.log("manage Users middleware");
  next();
});

router.get("/", getAllmanageUsers);

router.get("/:id", getmanageUsers);

router.post("/", addmanageUsers);

router.put("/:id", updatemanageUsers);

router.delete("/:id", deletemanageUsers);

module.exports = router;
