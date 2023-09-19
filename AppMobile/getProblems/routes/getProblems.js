const express = require("express");
const router = express.Router();
const { logic } = require("../controllers/getProblem");

router.use((req, res, next) => {
  console.log("Website get Problems middleware");
  next();
});

router.post("/", logic);

module.exports = router;
