const express = require("express");
const router = express.Router();
const { logic } = require("../controllers/logic");

router.use((req, res, next) => {
  console.log("app get users in Site middleware");
  next();
});

router.post("/", logic);

module.exports = router;
